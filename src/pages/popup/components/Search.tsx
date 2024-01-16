import { StyledButton } from "@root/src/shared/styledComponents/StyledButton";
import { StyledHeader1 } from "@root/src/shared/styledComponents/StyledText";
import React from "react";

const Search = () => {
  const handleCaptureClick = () => {
    chrome.runtime.sendMessage({ action: "captureTab" });
  };

  return (
    <React.Fragment>
      <StyledHeader1>IS THERE SOMETHING INTERESTING HERE?</StyledHeader1>
      <StyledButton onClick={handleCaptureClick} style={{ marginTop: "auto" }}>
        SEARCH
      </StyledButton>
    </React.Fragment>
  );
};

export default Search;
