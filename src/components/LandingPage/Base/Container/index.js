import React from "react";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: ${MAIN_COLORS?.MAIN?.CONTAINER_BACKGROUND};
  border-top-width: 0px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-style: solid;
  border-bottom-color: ${MAIN_COLORS?.MAIN?.LINE};
  border-left-color: ${MAIN_COLORS?.MAIN?.LINE};
  border-right-color: ${MAIN_COLORS?.MAIN?.LINE};
  max-width: ${({ $width }) => $width}px;
  background: white;
  overflow: hidden;
`;

export const Container = ({ children, $layoutDesign = "DESKTOP" }) => {
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

  const width = getLayouts({ layoutDesign: $layoutDesign });
  return <Layout $width={width}>{children}</Layout>;
};
