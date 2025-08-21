import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import styled from "styled-components";
import _ from "lodash";
import { PlaceHolderSlide } from "./PlaceHolderSlide";

const Container = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-slide {
    transition-property: opacity !important;
  }
`;

export const FadeSlide = ({ $images = [], $delay = 1 }) => {
  return (
    <Container
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      spaceBetween={0}
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
