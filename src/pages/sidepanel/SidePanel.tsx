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
    // 저장된 이미지 불러오기
    const savedImages = JSON.parse(localStorage.getItem('capturedImages') || '[]');
    setCapturedImages(savedImages);

    const handleMessage = message => {
      if (message.action === 'capturedImage') {
        const newImages = [...capturedImages, message.imageUri];
        if (newImages.length > 20) newImages.shift();

        // 이미지 저장하기
        localStorage.setItem('capturedImages', JSON.stringify(newImages));
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
