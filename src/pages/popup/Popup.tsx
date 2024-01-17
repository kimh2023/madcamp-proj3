import React, { useState, useEffect, useCallback } from "react";
import "@pages/popup/Popup.css";
import withSuspense from "@src/shared/hoc/withSuspense";
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary";
import Search from "./components/Search";
import Login from "../../shared/components/Login";
import axiosInstance from "@root/utils/axiosInstance";
import { SessionImageDto } from "@root/src/shared/types";
import { sendImage } from "@root/utils/sendImage";

const Popup = () => {
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    const handleMessage = (message) => {
      console.log("POPUP", message);
      if (message.action === "capturedImage") {
        sendImage(message.imageUri);
        window.close();
        return true;
      } else if (message.action === "session") {
        setLoginState(!!message.isVerified);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);
    chrome.runtime.sendMessage({ action: "getSession" });

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return <div className="App">{loginState ? <Search /> : <Login />}</div>;
};

export default withErrorBoundary(
  withSuspense(Popup, <div>Loading...</div>),
  <div>Error Occur</div>,
);
