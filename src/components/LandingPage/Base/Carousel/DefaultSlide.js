import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import styled from "styled-components";
import _ from "lodash";
import { PlaceHolderSlide } from "@components/LandingPage/Base/Carousel/PlaceHolderSlide";

const Container = styled(Swiper)`
  width: 100%;
  height: 100%;
  border-radius: ${({ $borderSlideRadius = 0 }) => $borderSlideRadius}px;
`;

export const DefaultSlide = ({ $images = [], $delay = 1, $borderSlideRadius = 0 }) => {
  console.log(" $borderSlideRadius :>> ", $borderSlideRadius);
  return (
    <Container
      $borderSlideRadius={$borderSlideRadius}
      modules={[Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: $delay * 1000,
        disableOnInteraction: false,
      }}
    >
      {_.map($images, (url, index) => {
        const isPlaceHolder = _.isNil(url);
        return (
          <SwiperSlide key={index}>
            {isPlaceHolder ? (
              <PlaceHolderSlide $index={index} />
            ) : (
              <Image
                src={url}
                alt={`slide-${index}`}
                fill
                style={{ objectFit: "cover", borderRadius: 8 }}
                priority={index === 0}
              />
            )}
          </SwiperSlide>
        );
      })}
    </Container>
  );
};
