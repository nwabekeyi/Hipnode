import React, { useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../context/themeContext"; // Adjust path to your ThemeContext

const Modal = ({
  isOpen,
  onClose,
  children,
  size = "md",
  height,
  position = "center", // New prop for positioning
}) => {
  const { themeColors } = useContext(ThemeContext); // Access themeColors from ThemeContext
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
    "top-right": "items-start justify-end pt-28 pr-2",
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
        className={`rounded-lg ${modalWidthClass} mx-4 p-3 z-10 overflow-auto hide-scrollbar ${
          modalHeightClass.className || ""
        }`}
        style={{
          backgroundColor: themeColors.background, // #f7f7f7 (light) or #1d252a (dark)
          color: themeColors.textColor, // #3f4354 (light) or #f7f7f7 (dark)
          height: height ? height : undefined,
        }}
      >
        <button
          className="absolute top-0 right-0 mt-4 mr-4"
          style={{
            color: themeColors.placeholderSecondary, // #dcdfe1 (light) or #52575c (dark)
          }}
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
