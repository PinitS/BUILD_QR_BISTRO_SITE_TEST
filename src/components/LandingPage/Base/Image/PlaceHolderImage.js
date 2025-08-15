import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text } from "../Text";
import _ from "lodash";
import { getAngleFromAspectRatio } from "@utils/getAngleFromAspectRatio";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ededed;
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
    background-color: #e1e1e1;
    transform-origin: center;
  }

  &::before {
    transform: ${({ $angle }) => `translate(-50%, -50%) rotate(${$angle}deg)`};
  }

  &::after {
    transform: ${({ $angle }) => `translate(-50%, -50%) rotate(-${$angle}deg)`};
  }
`;
export const PlaceHolderImage = ({ $label = "Upload Image", $fixSize = null }) => {
  const containerRef = useRef(null);
  const [containerAttribute, setContainerAttribute] = useState(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect || {};
      setContainerAttribute({
        width: width,
        height: height,
        aspectRatio: width / height,
        angle: getAngleFromAspectRatio(width / height),
      });
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Container ref={containerRef} $angle={containerAttribute?.angle}>
      <Text
        $fontFamily="Sen"
        $textTransform="capitalize"
        $color={"#c5c5c5"}
        $fontSize={$fixSize ? $fixSize : Math.min((containerAttribute?.width * 12) / 100, 32)}
        $fontWeight={500}
        $align="start"
      >
        {$label}
      </Text>
    </Container>
  );
};
