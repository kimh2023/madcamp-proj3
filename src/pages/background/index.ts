import { SessionDto, SessionImageDto } from "@root/src/shared/types";
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
  } else if (request.action === "setSessionImage") {
    setCapturedImage(request.message);
    return true;
  } else if (request.action === "getSessionImage") {
    getCapturedImage();
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

const captureActiveTab = () => {
  console.log("BACK: captureActiveTab");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log("BACK: tab query", tabs);
    if (tabs.length === 0) {
      console.log("BACK: no tabs, is devtool open??");
      return;
    }
    const tab = tabs[0];
    chrome.tabs.captureVisibleTab(
      tab.windowId,
      { format: "png" },
      (imageUri) => {
        console.log("BACK: tab capture");
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
};

const setCapturedImage = (value: SessionImageDto) => {
  chrome.storage.local.set({ sessionImage: value }, () => {
    console.log("Session image has been set:", value);
  });
  chrome.runtime.sendMessage({
    action: "sessionImage",
    blobUrl: value?.blobUrl,
    localizedObjectAnnotations: value?.localizedObjectAnnotations,
  });
  sendContentScript();
};

const getCapturedImage = () => {
  chrome.storage.local.get(["sessionImage"], (res) => {
    const sessionImage: SessionImageDto = res.sessionImage;
    chrome.runtime.sendMessage({
      action: "sessionImage",
      blobUrl: sessionImage?.blobUrl,
      localizedObjectAnnotations: sessionImage?.localizedObjectAnnotations,
    });
    sendContentScript();
  });
};

/////////////////////////////

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name === "knockknock");
  port.onMessage.addListener(function (msg) {
    if (msg.action === "getSession") {
      chrome.storage.local.get(["sessionImage"], (res) => {
        const sessionImage: SessionImageDto = res.sessionImage;
        port.postMessage({
          action: "sessionImage",
          blobUrl: sessionImage?.blobUrl,
          localizedObjectAnnotations: sessionImage?.localizedObjectAnnotations,
          base64: sessionImage?.base64,
        });
      });
    }
  });
});

function sendContentScript() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("BACK: tabs", tabs);
      if (tabs.length === 0) {
        console.log("BACK: no tabs, is devtool open??");
        return;
      }
      const tab = tabs[0];
      const port = chrome.tabs.connect(tab.id, {
        name: "knockback",
      });
      chrome.storage.local.get(["sessionImage"], (res) => {
        const sessionImage: SessionImageDto = res.sessionImage;
        port.postMessage({
          action: "openOverlay",
          blobUrl: sessionImage?.blobUrl,
          localizedObjectAnnotations: sessionImage?.localizedObjectAnnotations,
          base64: sessionImage?.base64,
        });
        resolve(null);
      });
    });
  });
}
