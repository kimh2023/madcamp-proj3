/**
 * DO NOT USE import someModule from '...';
 *
 * @issue-url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/160
 *
 * Chrome extensions don't support modules in content scripts.
 * If you want to use other modules in content scripts, you need to import them via these files.
 */
import("@pages/content/ui");
import("@pages/content/injected");

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("index", message);
//   console.log("finally??");
//   if (message.type === "sessionImage") {
//     const imageUrl = message.imageUrl;
//     console.log("finally??");

//     // Assuming you have a function in your <App> component to update the image
//     //   updateImageInApp(imageUrl);
//   }
//   return true;
// });

// const sendUpdateMessage = () => {
//   console.log("index");
//   chrome.runtime.sendMessage({ type: "getSessionImage" });
// };

// // Call the function to send a message when the page is updated
// sendUpdateMessage();
