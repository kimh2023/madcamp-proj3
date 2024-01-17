import { useState, useEffect } from "react";
import axiosInstance from "@root/utils/axiosInstance";
import "@pages/options/style/OptionPage.css";

const WishlistPage = () => {
  const [boardName, setBoardName] = useState("");
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const loadBoards = async () => {
      const loadedBoards = [];
      let boardId = 1;
      let fetchMore = true;

      while (fetchMore) {
        try {
          const response = await axiosInstance.get(`/boards/${boardId}`);
          if (response.data.success) {
            loadedBoards.push(response.data.board);
            boardId++;
          } else {
            fetchMore = false; // Stop the loop if the board is not found
          }
        } catch (error) {
          console.error(`Error fetching board with ID ${boardId}:`, error);
          fetchMore = false; // Stop the loop in case of an error
        }
      }

      setBoards(loadedBoards);
    };

    loadBoards();
  }, []);

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
          <h2>{board.name}</h2>
          {/* Render more details about the board here */}
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
