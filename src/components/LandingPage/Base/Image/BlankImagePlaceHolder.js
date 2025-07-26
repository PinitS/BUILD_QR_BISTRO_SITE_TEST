import React from "react";
import styled from "styled-components";
import { Text } from "../Text";

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
    width: 200%;
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

export const BlankImagePlaceHolder = ({ $angle, $fontSize = undefined }) => {
  return (
    <Container $angle={$angle}>
      <Text
        $fontFamily="Sen"
        $textTransform="capitalize"
        $color={"#c5c5c5"}
        $fontSize={$fontSize ? $fontSize : "clamp(8px, 2vw, 20px)"}
        $fontWeight={500}
        $align="start"
      >
        Blank Image
      </Text>
    </Container>
  );
};
