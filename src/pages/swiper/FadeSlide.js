// DefaultSlide.js
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styled from "styled-components";
import _ from "lodash";
import Fade from "embla-carousel-fade";
const Viewport = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const ContainerSlide = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 100%;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;
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

export const FadeEmblaSlide = ({ images = [] }) => {
  const autoPlayDelay = 5000;
  const borderRadius = 24;
  const [emblaRef, emblaApi] = useEmblaCarousel(_, [
    Autoplay({
      loop: true,
      delay: 3000,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      stopOnInteraction: false,
    }),
    Fade(),
  ]);

  return (
    <Viewport ref={emblaRef}>
      <Container>
        {_.map(images, (src, index) => (
          <ContainerSlide key={index}>
            <ContainerImage $borderRadius={borderRadius}>
              <Image src={src} alt={`slide-${index}`} />
            </ContainerImage>
          </ContainerSlide>
        ))}
      </Container>
    </Viewport>
  );
};
