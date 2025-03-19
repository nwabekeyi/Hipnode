import React, { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children, size = "md" }) => {
  const modalRef = useRef();

  // Handle click outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Define size classes
  const sizeClasses = {
    sm: "w-80 h-48", // Small modal
    md: "w-96 h-64", // Medium modal (default)
    lg: "w-120 h-96", // Large modal
    full: "w-full h-full", // Full-screen modal
  };

  // Get the appropriate size class
  const modalSizeClass = sizeClasses[size] || sizeClasses["md"];

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100] grid">
      <div
        ref={modalRef}
        className={`bg-white rounded-lg ${modalSizeClass} mx-4 p-3 z-10 overflow-auto h-[auto]`}
      >
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
