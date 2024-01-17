import { SessionImageDto } from "@root/src/shared/types";
import axiosInstance from "./axiosInstance";

const createBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return blob;
};

export const sendImage = (imageUri) => {
  chrome.windows.getCurrent((w) => {
    chrome.sidePanel.open({ windowId: w.id });
  });

  const formData = new FormData();

  // const image = imageUri.replace(/^data:image\/png;base64,/, "");
  const image = createBlob(imageUri);
  formData.append("image", image);

  return axiosInstance
    .post("/search", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const data = response.data;
      if (response.data.success) {
        chrome.runtime.sendMessage({
          action: "setSessionImage",
          message: {
            blobUrl: URL.createObjectURL(image),
            localizedObjectAnnotations:
              response.data.localizedObjectAnnotations,
            base64: imageUri,
          } as SessionImageDto,
        });
      }
    })
    .catch((error) => {
      console.error("Error sending image to API:", error);
      alert("Error sending message, please try again");
      throw error;
    });
};
