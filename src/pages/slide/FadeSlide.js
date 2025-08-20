import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import styled from "styled-components";

const Container = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-slide {
    transition-property: opacity !important;
  }
`;

export const FadeSlide = ({ images = [] }) => {
  return (
    <Container
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {images.map((url, index) => (
        <SwiperSlide key={index}>
          <Image
            src={url}
            alt={`slide-${index}`}
            fill
            style={{ objectFit: "cover", borderRadius: 8 }}
            priority={index === 0}
          />
        </SwiperSlide>
      ))}
    </Container>
  );
};
