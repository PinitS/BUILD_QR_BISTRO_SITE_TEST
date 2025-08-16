// npm install three
import React, { useEffect, useRef } from "react";
import { Text } from "@components/LandingPage/Base/Text";
import { LOREM_IPSUM } from "statics/LOREM_IPSUM";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import { Starfield } from "@components/LandingPage/Base/AnimationBackground/Starfield";
import { GradientFlow } from "@components/LandingPage/Base/AnimationBackground/GradientFlow";

const Layouts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background: ${MAIN_COLORS?.MAIN?.CONTAINER_BACKGROUND};
  position: relative;
`;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  height: auto;
  width: 100%;
  max-width: 1024px;
  z-index: 1;
  color: white;
  /* background: white; */
`;

export default function StarBackgroundPage() {
  return (
    <Layouts>
      {/* <Starfield /> */}
      {/* <GradientFlow /> */}
      <Container>
        <Text $ellipsis={false} $color={"red"} $fontSize={14} $textTransform="capitalize" $fontWeight={500}>
          {LOREM_IPSUM}
        </Text>
      </Container>
    </Layouts>
  );
}
