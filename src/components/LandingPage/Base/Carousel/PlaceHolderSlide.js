import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text } from "../Text";
import _ from "lodash";
import { getAngleFromAspectRatio } from "@utils/getAngleFromAspectRatio";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: ${({ $borderRadius = 0 }) => $borderRadius}px;
`;
export const PlaceHolderSlide = ({ $index = 0, $borderRadius = 0 }) => {
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
    <Container ref={containerRef} $borderRadius={$borderRadius}>
      <Text
        $fontFamily="Sen"
        $textTransform="capitalize"
        $color={"#fff"}
        $fontSize={Math.min((containerAttribute?.width * 12) / 100, 32)}
        $fontWeight={500}
        $align="center"
      >
        {`Slide ${$index + 1}`}
      </Text>
    </Container>
  );
};
