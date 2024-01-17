import {
  LocalizedObjectAnnotationDto,
  SessionImageDto,
} from "@root/src/shared/types";
import { sendImage } from "@root/utils/sendImage";
import React, { useState, useEffect } from "react";

export default function App() {
  const [renderApp, setRenderApp] = useState(false);
  const [imageURI, setImageURI] = useState<string>();
  const [capturedImage, setCapturedImage] =
    useState<LocalizedObjectAnnotationDto[]>();

  useEffect(() => {
    console.log("hi?");
    const port = chrome.runtime.connect({ name: "knockknock" });
    port.postMessage({ action: "getSession" });
    port.onMessage.addListener((message) => {
      console.log("inapp", message);
      if (message.action === "sessionImage") {
        setImageURI(message.base64);
        setCapturedImage(message.localizedObjectAnnotations);
      }
    });

    chrome.runtime.onConnect.addListener(function (port) {
      console.assert(port.name === "knockback");
      port.onMessage.addListener(function (msg) {
        console.log("sent to me");
        if (msg.action === "openOverlay") {
          setRenderApp(true);
          setImageURI(msg.base64);
          setCapturedImage(msg.localizedObjectAnnotations);
        }
      });
    });
  }, []);

  if (!renderApp) {
    return <></>;
  }

  const renderRectangles = () => {
    if (!capturedImage) {
      return <></>;
    }
    return (
      <React.Fragment>
        {capturedImage.map((product, index) => {
          const vertices = product.vertices;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${Math.floor(vertices[0].x * 100)}%`,
                top: `${Math.floor(vertices[0].y * 100)}%`,
                width: `${Math.floor((vertices[2].x - vertices[0].x) * 100)}%`,
                height: `${Math.floor((vertices[2].y - vertices[0].y) * 100)}%`,
                minHeight: 10,
                borderRadius: "10px",
                background: "var(--overlay, rgba(251, 241, 255, 0.80))",
                fontFamily: "Archivo Black",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {index}. {product.name}
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <button className="overlay" onClick={() => setRenderApp(false)}>
      <div className="image-container">
        <div className="inside-image-container">
          <img
            className="image"
            src={imageURI}
            alt=""
            style={{ borderRadius: "10px" }}
          ></img>
          {renderRectangles()}
        </div>
      </div>
    </button>
  );
}
