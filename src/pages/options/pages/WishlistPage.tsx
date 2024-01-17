import { useState, useEffect } from "react";
import axiosInstance from "@root/utils/axiosInstance";
import "@pages/options/style/OptionPage.css";
import BoardDetailsPage from "./BoardDetailsPage";

const WishlistPage = () => {
  const [boardName, setBoardName] = useState("");
  const [boards, setBoards] = useState([]);

  const navigateToBoardDetails = (boardId) => {
    window.location.hash = `wishlist#${boardId}`;
  };

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await axiosInstance.get("/boards");
        if (response.data.success) {
          console.log(response.data);
          setBoards(response.data.boards);
        } else {
          console.log("Failed to load board s:", response.data.message);
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

  const boardIdFromHash = getBoardIdFromHash();

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

  return (
    <div className="wishlist">
      {boardIdFromHash ? (
        <BoardDetailsPage boardId={boardIdFromHash} />
      ) : (
        <>
          <form onSubmit={handleCreateBoard} className="wishlist-form">
            <span className="wishlist-label">Wishlist</span>
            <div className="wishlist-controls">
              <button type="submit" className="wishlist-new-button">
                New
              </button>
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Enter board name"
                className="wishlist-input"
              />
            </div>
          </form>
          {boards.map((board, index) => (
            <div key={index} className="board">
              <button
                onClick={() => navigateToBoardDetails(board.id)}
                className="board-name-button"
              >
                {board.name}
              </button>
              {/* Render more details about the board here */}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default WishlistPage;
