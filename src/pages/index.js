import { Grid } from "@components/Editor/Grid";
import { useContainerDimensions } from "@hooks/useContainerDimensions";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

export default () => {
  const { width: containerWidth, height: containerHeight, ref: containerRef } = useContainerDimensions();
  const NUM_COLUMNS = 20;
  const gridColumnWidth = containerWidth / NUM_COLUMNS;

  return (
    <Container ref={containerRef} $gridColumnWidth={gridColumnWidth}>
      <Grid $containerWidth={containerWidth} />
    </Container>
  );
};
