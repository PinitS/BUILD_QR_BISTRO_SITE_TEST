import React from "react";
import styled from "styled-components";
import { Text } from "@components/LandingPage/Base/Text";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #a6a6a6;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 1px;
    background-color: #c5c5c5;
    transform-origin: center;
  }

  &::before {
    transform: ${({ $angle }) => `translate(-50%, -50%) rotate(${$angle}deg)`};
  }

  &::after {
    transform: ${({ $angle }) => `translate(-50%, -50%) rotate(-${$angle}deg)`};
  }
`;

export const BlankImagePlaceHolder = ({ $angle, $size = 12 }) => {
  return (
    <Container $angle={$angle}>
      <Text
        $fontFamily="Sen"
        $textTransform="capitalize"
        $color={"#c5c5c5"}
        $fontSize={Math.min(($size * 12) / 100, 32)}
        $fontWeight={500}
        $align="start"
      >
        Blank Image
      </Text>
    </Container>
  );
};
