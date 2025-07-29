import React from "react";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-top-width: 0px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-style: solid;
  border-bottom-color: ${MAIN_COLORS?.MAIN?.LINE};
  border-left-color: ${MAIN_COLORS?.MAIN?.LINE};
  border-right-color: ${MAIN_COLORS?.MAIN?.LINE};
  max-width: ${({ $width }) => $width}px;
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
  overflow: scroll;
`;

export const Container = ({
  children,
  $layoutDesign = "DESKTOP",
  $backgroundColor,
  $containerBackgroundOpacity,
}) => {
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
    if (color === "transparent") {
      return "transparent";
    }

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
    <Layout $backgroundColor={backgroundColor} $width={width}>
      {children}
    </Layout>
  );
};
