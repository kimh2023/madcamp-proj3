import React, { useState, useEffect } from "react";
import "@pages/popup/Popup.css";
import withSuspense from "@src/shared/hoc/withSuspense";
import { StyledButton } from "@root/src/shared/styledComponents/StyledButton";
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary";
import Search from "./components/Search";
import Login from "../../shared/components/Login";

const Popup = () => {
  const [screenshot, setScreenshot] = useState(null);
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    const handleMessage = (message) => {
      // sender, sendResponse 제거
      if (message.action === "capturedImage") {
        setScreenshot(message.imageUri);
      } else if (message.action === "token") {
        console.log("token", message.token, !!message.token);
        setLoginState(!!message.token);
      }
    };
    chrome.runtime.onMessage.addListener(handleMessage);

    // chrome.runtime.sendMessage({
    //   action: "setToken",
    //   message: null,
    // });
    chrome.runtime.sendMessage({ action: "getToken" }, (token) => {
      // is already logged in?
      console.log("token", token, !!token);
      setLoginState(!!token);
    });

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div className="App">
      {loginState ? <Search /> : <Login />}
      {/* {loginState ? <Login /> : <Search />} */}

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
