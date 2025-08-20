// DefaultSlide.js (หรือ .tsx ถ้าใช้ TypeScript)
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import styled from "styled-components";

const Container = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

export const DefaultSlide = ({ images = [] }) => {
  return (
    <Container
      modules={[Autoplay]}
      spaceBetween={10}
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
