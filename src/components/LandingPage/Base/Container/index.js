import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: ${({ $width }) => $width}px;
  max-width: ${({ $width }) => $width}px;
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
`;

export const Container = React.forwardRef(
  ({ children, $layoutDesign = "DESKTOP", $backgroundColor, $containerBackgroundOpacity }, ref) => {
    const getLayouts = ({ layoutDesign = "DESKTOP" }) => {
      switch (layoutDesign) {
        case "DESKTOP":
          return 1024;
        case "MOBILE":
          return 425;
        default:
          return 1024;
      }
    };

    const getBackgroundColorWithOpacity = ({ color, opacity }) => {
      if (color === "transparent") return "transparent";
      const alpha = Math.round(Math.max(0, Math.min(100, opacity)) * 2.55);
      const alphaHex = alpha.toString(16).padStart(2, "0");
      return `${color}${alphaHex}`;
    };

    const width = getLayouts({ layoutDesign: $layoutDesign });
    const backgroundColor = getBackgroundColorWithOpacity({
      color: $backgroundColor,
      opacity: $containerBackgroundOpacity,
    });

    return (
      <Layout ref={ref} $backgroundColor={backgroundColor} $width={width}>
        {children}
      </Layout>
    );
  },
);
