import React, { useState, useEffect } from "react";
import "@pages/sidepanel/SidePanel.css";
import withSuspense from "@src/shared/hoc/withSuspense";
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary";
import {
  LocalizedObjectAnnotationDto,
  SessionImageDto,
} from "@root/src/shared/types";
import {
  StyledHeader1,
  StyledSubheader1,
} from "@root/src/shared/styledComponents/StyledText";
import {
  GridContainer,
  StyledHeaderSideBar,
  StyledImages,
} from "./components/StyledComponents";
import { StyledButton } from "@root/src/shared/styledComponents/StyledButton";
import { sendImage } from "@root/utils/sendImage";
import axiosInstance from "@root/utils/axiosInstance";

const SidePanel = () => {
  const [capturedImage, setCapturedImage] =
    useState<LocalizedObjectAnnotationDto[]>();

  useEffect(() => {
    const handleMessage = (message) => {
      console.log(message);
      if (message.action === "sessionImage") {
        const localizedObjectAnnotations = message.localizedObjectAnnotations;
        // const filteredProducts = localizedObjectAnnotations.filter;
        setCapturedImage(message.localizedObjectAnnotations);
      } else if (message.action === "capturedImage") {
        sendImage(message.imageUri);
        return true;
      }
    };
    chrome.runtime.onMessage.addListener(handleMessage);
    chrome.runtime.sendMessage({ action: "getSessionImage" });
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const handleCaptureClick = () => {
    chrome.runtime.sendMessage({ action: "captureTab" });
  };

  return (
    <div className="App" style={{ minHeight: "100%" }}>
      <StyledHeader1 style={{ textAlign: "left" }}>
        DETECTED PRODUCTS
      </StyledHeader1>
      {capturedImage && capturedImage.length == 0 && (
        <React.Fragment>
          <StyledSubheader1 style={{ textAlign: "left" }}>
            NO PRODUCTS DETECTED
          </StyledSubheader1>
        </React.Fragment>
      )}
      {capturedImage &&
        capturedImage.map((object, index) => (
          <div
            key={index}
            style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          >
            <StyledHeaderSideBar>
              {index + 1}. {object.name}
            </StyledHeaderSideBar>
            <GridContainer>
              {object.products &&
                object.products.map((product, index) => (
                  <StyledImages key={index} product={product}></StyledImages>
                ))}
            </GridContainer>
          </div>
        ))}
      <StyledButton
        onClick={handleCaptureClick}
        style={{ marginTop: "auto", marginBottom: "30px" }}
      >
        SEARCH AGAIN
      </StyledButton>
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(SidePanel, <React.Fragment>Loading...</React.Fragment>),
  <React.Fragment>Error Occur</React.Fragment>,
);
