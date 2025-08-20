import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styled from "styled-components";
import _ from "lodash";

const Viewport = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 8px;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const ContainerSlide = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 80%;
  height: 100%;
  box-sizing: border-box;
  transition: transform 0.3s ease;

  ${({ $isCenter }) => (!$isCenter ? "transform: scale(0.9);" : "transform: scale(1);")}
`;

const ContainerImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${({ $borderRadius = 0 }) => $borderRadius}px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CenterScaleSlide = ({ images = [] }) => {
  const autoPlayDelay = 1000;
  const borderRadius = 24;
  const [emblaRef, embla] = useEmblaCarousel(_, [
    Autoplay({
      loop: true,
      delay: autoPlayDelay,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      stopOnInteraction: false,
    }),
  ]);

  const [centerIndex, setCenterIndex] = useState(0);

  const updateCenterIndex = useCallback(() => {
    if (!embla) return;
    const index = embla.selectedScrollSnap();
    setCenterIndex(index);
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    updateCenterIndex();
    embla.on("select", updateCenterIndex);
  }, [embla, updateCenterIndex]);

  return (
    <Viewport ref={emblaRef}>
      <Container>
        {_.map(images, (src, index) => (
          <ContainerSlide key={index} $isCenter={index === centerIndex}>
            <ContainerImage $borderRadius={borderRadius}>
              <Image src={src} alt={`slide-${index}`} />
            </ContainerImage>
          </ContainerSlide>
        ))}
      </Container>
    </Viewport>
  );
};
