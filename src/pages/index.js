import React, { useEffect } from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";
import { AnimationBackground } from "@components/LandingPage/PageBuilder/RenderEditor/AnimationBackground";
import { setCustomizeBackground } from "@redux/reducers/customizeBackground.reducers";
import { setFreeformBlocks } from "@redux/reducers/freeformBlocks.reducers";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import { httpRequest } from "@helpers/http/httpRequest";
import { resolveSubdomain } from "@utils/resolve/resolveSubdomain";
import { ContainerRenderViewFreeform } from "@components/LandingPage/PageBuilder/RenderView/Freeform";
import styled from "styled-components";
import { resolveColorWithOpacity } from "@utils/resolve/resolveBackgroundColorWithOpacity";
import { ContainerRenderViewStack } from "@components/LandingPage/PageBuilder/RenderView/Stack";

const Layouts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
  background-image: ${({ $backgroundImage }) => ($backgroundImage ? `url(${$backgroundImage})` : "none")};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1024px;
  min-height: 100vh;
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
`;

export default ({ ctxSubdomain, ctxBackground, ctxFreeformBlocks, ctxStackBlocks }) => {
  const dispatch = useDispatch();
  const { ref } = useContainerDimensionContext();
  const customizeBackground = useSelector((state) => state?.customizeBackground?.data, shallowEqual);

  const backgroundColor = resolveColorWithOpacity({
    color: customizeBackground?.containerBackgroundColor,
    opacity: customizeBackground?.containerBackgroundOpacity,
  });

  useEffect(() => {
    batch(() => {
      dispatch(setCustomizeBackground(ctxBackground));
      dispatch(setFreeformBlocks(ctxFreeformBlocks));
      dispatch(setStackBlocks(ctxStackBlocks));
    });
  }, [dispatch, ctxSubdomain, ctxBackground, ctxFreeformBlocks, ctxStackBlocks]);

  return (
    <Layouts
      $backgroundColor={_.get(customizeBackground, ["bodyBackgroundColor"])}
      $backgroundImage={_.get(customizeBackground, ["bodyBackgroundImage"])}
    >
      <AnimationBackground $customizeBackground={customizeBackground} />

      <Container ref={ref} $backgroundColor={backgroundColor}>
        <ContainerRenderViewFreeform />
        <ContainerRenderViewStack />
      </Container>
    </Layouts>
  );
};

export async function getServerSideProps(ctx) {
  const subdomain = resolveSubdomain({ ctx });

  const resp = await httpRequest({
    path: "/restaurant/landing-page/get-publish",
    data: { subdomain },
  });

  const landingPage = _.get(resp, ["result", "landingPage"]);

  return {
    props: {
      ctxSubdomain: subdomain,
      ctxBackground: _.get(landingPage, ["background"]),
      ctxFreeformBlocks: _.get(landingPage, ["freeformBlocks"]),
      ctxStackBlocks: _.get(landingPage, ["stackBlocks"]),
    },
  };
}
