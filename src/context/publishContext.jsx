import { createContext, useState, useEffect } from "react";

export const PublishContext = createContext();

export const PublisherProvider = ({ children }) => {
  const [isPublisherOpen, setIsPublisherOpen] = useState(false);


  const openPublisher = () => {
    setIsPublisherOpen(true);
  };

  const closePublisher = () => {
    setIsPublisherOpen(false);
  };

  return (
    <PublishContext.Provider value={{ isPublisherOpen, openPublisher, closePublisher }}>
      {children}
    </PublishContext.Provider>
  );
};

