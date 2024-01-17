import React, { useEffect, useState } from "react";
import axiosInstance from "@root/utils/axiosInstance";
import "@pages/options/style/OptionPage.css";
import PropTypes from "prop-types";

const BoardDetailsPage = ({ boardId }) => {
  const [boardDetails, setBoardDetails] = useState(null);

  useEffect(() => {
    const fetchBoardDetails = async () => {
      console.log(`Fetching details for board ID: ${boardId}`);
      try {
        const response = await axiosInstance.get(`/boards/${boardId}`);
        console.log("API response:", response.data);
        if (response.data.success) {
          setBoardDetails(response.data); // Store the entire response
        } else {
          console.error("Failed to load board details:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    if (boardId) {
      fetchBoardDetails();
    }
  }, [boardId]);

  if (!boardDetails) {
    console.log("Loading board details...");
    return <div>Loading board details...</div>;
  }

  console.log("Rendering board details:", boardDetails);
  return (
    <div>
      <h1>{boardDetails.board.name}</h1>
      <div>
        {boardDetails.pins.map((pin, index) => {
          console.log(`Rendering pin ${index + 1}:`, pin);
          return (
            <div key={index} className="pin">
              <h3>{pin.name}</h3>
              <p>Price: ${pin.price}</p>
              <img src={pin.image} alt={pin.name} />
              <a href={pin.link} target="_blank" rel="noopener noreferrer">
                View Product
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

BoardDetailsPage.propTypes = {
  boardId: PropTypes.string.isRequired, // 또는 PropTypes.number.isRequired, boardId의 타입에 따라
};

export default BoardDetailsPage;
