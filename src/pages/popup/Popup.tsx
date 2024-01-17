import React, { useState, useEffect } from "react";
import "@pages/popup/Popup.css";
import withSuspense from "@src/shared/hoc/withSuspense";
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary";
import Search from "./components/Search";
import Login from "../../shared/components/Login";
import axiosInstance from "@root/utils/axiosInstance";

const Popup = () => {
  const [screenshot, setScreenshot] = useState(null);
  const [loginState, setLoginState] = useState(false);

  function sendImage(imageUri) {
    const formData = new FormData();
    const image = imageUri.replace(/^data:image\/png;base64,/, "");
    formData.append("image", image);

    return axiosInstance
      .post("/search", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log("API Response:", data);
      })
      .catch((error) => {
        console.error("Error sending image to API:", error);
        throw error; // Rethrow the error to propagate it up the chain
      });
  }

  useEffect(() => {
    // 로그인 상태를 문자열로 변환하여 저장
    const handleMessage = (message) => {
      // sender, sendResponse 제거
      console.log("POPUP", message);
      if (message.action === "capturedImage") {
        setScreenshot(message.imageUri);
        sendImage(message.imageUri);
        return true;
      } else if (message.action === "session") {
        setLoginState(!!message.isVerified);
      }
    };

    // chrome.runtime.sendMessage({
    //   action: "setSession",
    //   message: null,
    // });
    chrome.runtime.onMessage.addListener(handleMessage);
    chrome.runtime.sendMessage({ action: "getSession" });

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div className="App">
      {loginState ? <Search /> : <Login />}
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
  withSuspense(Popup, <div>Loading...</div>),
  <div>Error Occur</div>,
);
