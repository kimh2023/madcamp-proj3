import React, { useState, useEffect } from 'react';
import '@pages/sidepanel/SidePanel.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const SidePanel = () => {
  const theme = useStorage(exampleThemeStorage);
  const [capturedImages, setCapturedImages] = useState([]);

  useEffect(() => {
    const handleMessage = message => {
      if (message.action === 'capturedImage') {
        // 임시로 캡처된 이미지를 6개까지 저장합니다.
        const newImages = [...capturedImages, message.imageUri];
        if (newImages.length > 6) newImages.shift();
        setCapturedImages(newImages);
      }
    };
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [capturedImages]);

  return (
    <div className="App" style={{ backgroundColor: theme === 'light' ? '#fff' : '#000' }}>
      <div className="captured-images-container">
        {capturedImages.map((imageUri, index) => (
          <img key={index} src={imageUri} alt={`Captured ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(SidePanel, <React.Fragment>Loading...</React.Fragment>),
  <React.Fragment>Error Occur</React.Fragment>,
);
