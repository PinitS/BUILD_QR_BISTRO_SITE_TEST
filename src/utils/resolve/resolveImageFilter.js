import React from "react";

export const resolveImageFilter = ({ filterType = "NONE", filterValue = null }) => {
  switch (filterType) {
    case "GRAYSCALE":
      return `grayscale(${filterValue}%)`;

    case "BRIGHTNESS":
      return `brightness(${filterValue}%)`;

    case "CONTRAST":
      return `contrast(${filterValue}%)`;

    case "SATURATE":
      return `saturate(${filterValue}%)`;

    case "SEPIA":
      return `sepia(${filterValue}%)`;

    case "OPACITY":
      return `opacity(${filterValue}%)`;

    case "HUE_ROTATE":
      return `hue-rotate(${filterValue}deg)`;

    case "BLUR":
      return `blur(${filterValue}px)`;

    default:
      return "none";
  }
};
