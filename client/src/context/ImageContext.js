import React, { createContext, useState } from "react";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const addImage = (uri) => {
    const newImage = {
      id: Date.now(),
      photoId: Date.now(),
      imageLink: uri,
      isEncrypted: false,
    };
    setImages((prev) => [...prev, newImage]);
  };

  const encryptImage = (photoId) => {
    setImages((prev) =>
      prev.map((img) =>
        img.photoId === photoId ? { ...img, isEncrypted: true } : img
      )
    );
  };

  const decryptImage = (photoId) => {
    setImages((prev) =>
      prev.map((img) =>
        img.photoId === photoId ? { ...img, isEncrypted: false } : img
      )
    );
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        selectedImage,
        setSelectedImage,
        addImage,
        encryptImage,
        decryptImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
