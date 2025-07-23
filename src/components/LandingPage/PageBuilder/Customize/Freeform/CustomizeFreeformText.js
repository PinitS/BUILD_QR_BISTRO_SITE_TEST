import React from "react";
import { MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  padding: ${MAIN_SIZE?.SPACING}px;
  gap: ${MAIN_SIZE?.SPACING}px;
`;
export const CustomizeFreeformText = () => {
  return <Container>CustomizeFreeformText</Container>;
};
