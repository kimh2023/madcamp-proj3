import { SessionDto } from "@root/src/shared/types";
import axiosInstance from "@root/utils/axiosInstance";
import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import "webextension-polyfill";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

const handleActionClick = () => {
  console.log("click");
};

chrome.action.onClicked.addListener(handleActionClick);

console.log("background loaded");

function captureActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      return;
    }
    const tab = tabs[0];
    chrome.tabs.captureVisibleTab(
      tab.windowId,
      { format: "png" },
      (imageUri) => {
        if (chrome.runtime.lastError) {
          console.error(
            "Error capturing tab: ",
            chrome.runtime.lastError.message,
          );
          return;
        }
        // 캡처된 이미지 URI를 팝업으로 전송
        console.log("Captured image URI: ", imageUri);
        chrome.runtime.sendMessage({
          action: "capturedImage",
          imageUri: imageUri,
        });
      },
    );
  });
}

chrome.runtime.onMessage.addListener((request) => {
  console.log("BACK", request);
  // sender, sendResponse 제거
  if (request.action === "captureTab") {
    captureActiveTab();
    return true;
  } else if (request.action === "setSession") {
    setSession(request.message);
    return true;
  } else if (request.action === "getSession") {
    getSession();
    return true;
  }
});

const setSession = (value: SessionDto | null) => {
  chrome.storage.local.set({ session: value }, () => {
    console.log("Session has been set:", value);
  });
  chrome.runtime.sendMessage({
    action: "session",
    token: value?.token,
    userId: value?.userId,
    isVerified: value?.isVerified,
    signUpTab: value?.signUpTab || 0,
  });
};

const getSession = () => {
  chrome.storage.local.get(["session"], (res) => {
    const session: SessionDto = res.session;
    chrome.runtime.sendMessage({
      action: "session",
      token: session?.token,
      userId: session?.userId,
      isVerified: session?.isVerified,
      signUpTab: session?.signUpTab || 0,
    });
  });
};
