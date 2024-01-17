import React, { useEffect, useState } from "react";
import axiosInstance from "@root/utils/axiosInstance";
import "@pages/options/style/OptionPage.css";
import PropTypes from "prop-types";
import {
  StyledBoardText,
  StyledHeader1,
  StyledOptionsGrayText,
  StyledSubheader1,
} from "@root/src/shared/styledComponents/StyledText";
import {
  StyledWhiteContainer,
  StyledWhiteContainerSmall,
} from "@root/src/shared/styledComponents/StyledDiv";
import { GridContainer } from "../../sidepanel/components/StyledComponents";

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
    <React.Fragment>
      <StyledHeader1 style={{ textAlign: "left", marginBottom: "50px" }}>
        {boardDetails.board.name}
      </StyledHeader1>
      <GridContainer>
        {boardDetails.pins.map((pin, index) => {
          console.log(`Rendering pin ${index + 1}:`, pin);
          return (
            <StyledWhiteContainerSmall
              key={index}
              className="pin"
              onClick={() => window.open(pin.link, "_blank")}
            >
              <h3>{pin.name}</h3>
              <StyledSubheader1
                style={{ textAlign: "left", marginBottom: "10px" }}
              >
                Price: ${pin.price}
              </StyledSubheader1>
              <img src={pin.image} alt={pin.name} />
            </StyledWhiteContainerSmall>
          );
        })}
      </GridContainer>
    </React.Fragment>
  );
};

BoardDetailsPage.propTypes = {
  boardId: PropTypes.string.isRequired, // 또는 PropTypes.number.isRequired, boardId의 타입에 따라
};

export default BoardDetailsPage;
