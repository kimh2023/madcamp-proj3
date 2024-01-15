import React, { useState, useEffect } from "react";
import "@pages/popup/Popup.css";
import withSuspense from "@src/shared/hoc/withSuspense";
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary";
import { StyledButton } from "@root/src/shared/styledComponents/StyledButton";

const Popup = () => {
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    const handleMessage = (message) => {
      // sender, sendResponse 제거
      if (message.action === "capturedImage") {
        setScreenshot(message.imageUri);
      }
    };
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  useEffect(() => {
    chrome.storage.local.get(["token"], (res) => {
      // const token: string = res.token;
      // if (token) {
      // }
      console.log(res);
    });
  }, []);

  const handleCaptureClick = () => {
    chrome.runtime.sendMessage({ action: "captureTab" });
  };

  return (
    <div className="App">
      <header className="App-header">
        IS THERE SOMETHING INTERESTING HERE?
      </header>
      <StyledButton
        onClick={handleCaptureClick}
        style={{ marginTop: "auto", marginBottom: 30 }}
      >
        SEARCH
      </StyledButton>
      {screenshot && (
        <img
          src={screenshot}
          alt="Captured Screenshot"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(Popup, <div> Loading ... </div>),
  <div> Error Occur </div>,
);
