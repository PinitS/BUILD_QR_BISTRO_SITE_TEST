// CardEffectSlide.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import Image from "next/image";
import styled from "styled-components";
import _ from "lodash";
import { PlaceHolderSlide } from "./PlaceHolderSlide";

const StyledSwiper = styled(Swiper)`
  height: 100%;
  width: 100%;
  border-radius: ${({ $borderSlideRadius = 0 }) => $borderSlideRadius}px;
`;

export const CardSlide = ({ $images = [], $delay = 1, $borderSlideRadius = 0 }) => {
  return (
    <StyledSwiper
      $borderSlideRadius={$borderSlideRadius}
      effect="cards"
      grabCursor={true}
      modules={[Autoplay, EffectCards]}
      className="cardSwiper"
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
              <PlaceHolderSlide $index={index} $borderRadius={8} />
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
    </StyledSwiper>
  );
};
