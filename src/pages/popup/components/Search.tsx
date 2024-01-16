import { StyledButton } from "@root/src/shared/styledComponents/StyledButton";
import React from "react";

const Search = () => {
  const handleCaptureClick = () => {
    chrome.runtime.sendMessage({ action: "captureTab" });
  };

  return (
    <React.Fragment>
      <header className="App-header">
        IS THERE SOMETHING INTERESTING HERE?
      </header>
      <StyledButton
        onClick={handleCaptureClick}
        style={{ marginTop: "auto", marginBottom: 10 }}
      >
        SEARCH
      </StyledButton>
    </React.Fragment>
  );
};

export default Search;
