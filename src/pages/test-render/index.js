import { Grid } from "@components/LandingPage/PageBuilder/Grid";
import { ContainerRenderViewFreeform } from "@components/LandingPage/PageBuilder/RenderView/Freeform";
import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";
import React from "react";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Layouts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${MAIN_COLORS?.MAIN?.CONTAINER_BACKGROUND};
`;

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 1024px;
  overflow: scroll;
`;

export default () => {
  const { ref, device } = useContainerDimensionContext();
  return (
    <Layouts>
      <Container ref={ref}>
        {/* <ContainerRenderViewFreeform />
        <Grid /> */}
      </Container>
    </Layouts>
  );
};
