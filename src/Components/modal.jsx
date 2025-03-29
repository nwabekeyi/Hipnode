import React, { useEffect, useRef } from "react";

const Modal = ({
  isOpen,
  onClose,
  children,
  size = "md",
  height,
  position = "center", // New prop for positioning
}) => {
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

  // Define size classes (width only)
  const sizeClasses = {
    sm: "w-80",
    md: "w-96",
    lg: "w-120",
    full: "w-full",
  };

  // Define default height classes (used if height prop is not provided)
  const heightClasses = {
    sm: "h-48",
    md: "h-64",
    lg: "h-96",
    full: "h-full",
  };

  // Define position classes
  const positionClasses = {
    center: "items-center justify-center", // Default: centered
    top: "items-start justify-center pt-10",
    bottom: "items-end justify-center pb-10",
    left: "items-center justify-start pl-10",
    right: "items-center justify-end pr-10",
    "top-left": "items-start justify-start pt-10 pl-10",
    "top-right": "items-start justify-end pt-10 pr-10",
    "bottom-left": "items-end justify-start pb-10 pl-10",
    "bottom-right": "items-end justify-end pb-10 pr-10",
  };

  // Get the appropriate classes
  const modalWidthClass = sizeClasses[size] || sizeClasses["md"];
  const modalHeightClass = height
    ? { height } // Custom height as inline style
    : { className: heightClasses[size] || heightClasses["md"] };
  const modalPositionClass =
    positionClasses[position] || positionClasses["center"];

  if (!isOpen) return null;

  return (
    <div
      className={`absolute inset-0 flex bg-black bg-opacity-50 z-[100] grid ${modalPositionClass}`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg ${modalWidthClass} mx-4 p-3 z-10 overflow-auto ${
          modalHeightClass.className || ""
        }`}
        style={height ? { height } : undefined}
      >
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
