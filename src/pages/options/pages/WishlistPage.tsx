import { useState, useEffect } from "react";
import axiosInstance from "@root/utils/axiosInstance";
import "@pages/options/style/OptionPage.css";
import BoardDetailsPage from "./BoardDetailsPage";
import {
  StyledBoardText,
  StyledHeader1,
  StyledOptionsGrayText,
} from "@root/src/shared/styledComponents/StyledText";
import { StyledButton } from "@root/src/shared/styledComponents/StyledButton";
import { StyledInput } from "@root/src/shared/styledComponents/StyledInput";
import { Button } from "@chakra-ui/react";
import { MdModeEdit, MdDelete, MdCancel } from "react-icons/md";

const WishlistPage = () => {
  const [boardName, setBoardName] = useState("");
  const [boards, setBoards] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [currentBoardId, setCurrentBoardId] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const newBoardId = getBoardIdFromHash();
      console.log(newBoardId);
      setCurrentBoardId(newBoardId);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Call it to check the initial hash

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await axiosInstance.get("/boards");
        if (response.data.success) {
          setBoards(response.data.boards);
        } else {
          console.log("Failed to load boards:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    loadBoards();
  }, []);

  const getBoardIdFromHash = () => {
    const hashParts = window.location.hash.split("#");
    return hashParts.length === 3 && hashParts[1] === "wishlist"
      ? hashParts[2]
      : null;
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    console.log("Form submitted with board name:", boardName);

    if (!boardName) {
      console.log("Board name is empty, aborting board creation");
      return; // Check if boardName is not empty
    }

    try {
      const response = await axiosInstance.post("/boards", { name: boardName });
      if (response.data.success) {
        setBoards([...boards, response.data.board]);
        setBoardName(""); // Reset the input field after successful board creation
      }
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  const handleEditBoard = (boardId, newName) => {
    if (!newName.trim()) {
      alert("Board name cannot be empty");
      return;
    }
    axiosInstance
      .patch(`/boards/${boardId}`, { name: newName })
      .then((response) => {
        if (response.data.success) {
          console.log(`Board with ID ${boardId} updated successfully`);
          const updatedBoards = boards.map((board) =>
            board.id === boardId ? { ...board, name: newName } : board,
          );
          setBoards(updatedBoards);
          setEditMode((prev) => ({ ...prev, [boardId]: false })); // 종료 수정 모드
        }
      })
      .catch((error) =>
        console.error(`Error updating board with ID ${boardId}:`, error),
      );
  };

  const handleDeleteBoard = async (boardId) => {
    // 사용자에게 삭제를 확인하는 대화 상자 표시
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this board?",
    );
    if (!isConfirmed) {
      console.log("Board deletion cancelled");
      return; // 사용자가 취소를 선택하면 함수 종료
    }

    try {
      console.log(`Attempting to delete board with ID: ${boardId}`);
      const response = await axiosInstance.delete(`/boards/${boardId}`);
      if (response.data.success) {
        console.log(`Board with ID ${boardId} deleted successfully`);
        // 업데이트된 보드 목록 가져오기
        const updatedBoards = boards.filter((board) => board.id !== boardId);
        setBoards(updatedBoards);
      } else {
        console.error(
          `Failed to delete board with ID ${boardId}:`,
          response.data.message,
        );
      }
    } catch (error) {
      console.error(`Error deleting board with ID ${boardId}:`, error);
    }
  };
  const navigateToBoardDetails = (boardId) => {
    window.location.hash = `wishlist#${boardId}`;
  };
  const renderBoard = (board) => {
    return (
      <div key={board.id} className="board-card">
        <button
          className="board-info"
          onClick={() => navigateToBoardDetails(board.id)}
        >
          {editMode[board.id] ? (
            <div className="board-actions">
              <StyledInput
                type="text"
                defaultValue={board.name}
                onBlur={(e) => handleEditBoard(board.id, e.target.value)}
                textAlign={"left"}
              />
              <MdCancel
                onClick={(e) => {
                  setEditMode((prev) => ({ ...prev, [board.id]: false }));
                  e.stopPropagation();
                }}
                size={30}
              />
            </div>
          ) : (
            <div className="board-actions">
              <StyledBoardText
                className="board-name"
                style={{ textAlign: "left", width: "auto" }}
              >
                {board.name}
              </StyledBoardText>
              <MdModeEdit
                onClick={(e) => {
                  setEditMode((prev) => ({ ...prev, [board.id]: true }));
                  e.stopPropagation();
                }}
                size={20}
              />
              <MdDelete
                onClick={(e) => {
                  handleDeleteBoard(board.id);
                  e.stopPropagation();
                }}
                size={20}
              />
            </div>
          )}
        </button>
      </div>
    );
  };

  if (currentBoardId) {
    return (
      <div className="wishlist">
        <BoardDetailsPage boardId={currentBoardId} />
      </div>
    );
  }

  return (
    <div className="wishlist">
      <StyledHeader1 style={{ textAlign: "left" }}>WISHLIST</StyledHeader1>
      <form onSubmit={handleCreateBoard} className="wishlist-form">
        <StyledInput
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Enter board name"
          className="wishlist-input"
          textAlign={"left"}
        />
        <StyledButton
          type="submit"
          className="wishlist-new-button"
          style={{ width: "auto" }}
        >
          New
        </StyledButton>
      </form>
      <div className="board-list">{boards.map(renderBoard)}</div>
    </div>
  );
};

export default WishlistPage;

function getBoardIdFromHash() {
  const hashParts = window.location.hash.split("#");
  return hashParts.length === 3 && hashParts[1] === "wishlist"
    ? hashParts[2]
    : null;
}
