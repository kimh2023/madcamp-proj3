import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

const handleActionClick = () => {
  console.log('click');
};

chrome.action.onClicked.addListener(handleActionClick);

console.log('background loaded');

function captureActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length === 0) {
      return;
    }
    const tab = tabs[0];
    chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' }, imageUri => {
      if (chrome.runtime.lastError) {
        console.error('Error capturing tab: ', chrome.runtime.lastError.message);
        return;
      }
      // 캡처된 이미지 URI를 팝업으로 전송
      console.log('Captured image URI: ', imageUri);
      chrome.runtime.sendMessage({ action: 'capturedImage', imageUri: imageUri });
    });
  });
}

function openLoginPage() {
  chrome.tabs.create({ url: chrome.runtime.getURL('pages/login/index.html') });
}

chrome.runtime.onMessage.addListener(request => {
  // sender, sendResponse 제거
  if (request.action === 'captureTab') {
    captureActiveTab();
  } else if (request.action === 'openLogin  Page') {
    openLoginPage();
  }
});
