// CardEffectSlide.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import Image from "next/image";
import styled from "styled-components";

const StyledSwiper = styled(Swiper)`
  height: 100%;
  width: 100%;
`;

export const CardSlide = ({ images = [] }) => {
  return (
    <StyledSwiper
      effect="cards"
      grabCursor={true}
      modules={[Autoplay, EffectCards]}
      className="cardSwiper"
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
    >
      {images.map((url, index) => (
        <SwiperSlide key={index}>
          <Image
            src={url}
            alt={`card-slide-${index}`}
            fill
            style={{ objectFit: "cover", borderRadius: 8 }}
            priority={index === 0}
          />
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
};
