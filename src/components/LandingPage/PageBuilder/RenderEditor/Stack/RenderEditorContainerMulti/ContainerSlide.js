import { CardSlide } from "@components/LandingPage/Base/Carousel/CardSlide";
import { DefaultSlide } from "@components/LandingPage/Base/Carousel/DefaultSlide";
import { FadeSlide } from "@components/LandingPage/Base/Carousel/FadeSlide";
import { VerticalSlide } from "@components/LandingPage/Base/Carousel/VerticalSlide";
import _ from "lodash";
import React from "react";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
  border-top-right-radius: ${({ $borderTopRightRadius = 0 }) => $borderTopRightRadius}px;
  border-top-left-radius: ${({ $borderTopLeftRadius = 0 }) => $borderTopLeftRadius}px;
  border-bottom-right-radius: ${({ $borderBottomRightRadius = 0 }) => $borderBottomRightRadius}px;
  border-bottom-left-radius: ${({ $borderBottomLeftRadius = 0 }) => $borderBottomLeftRadius}px;
  border-width: ${({ $isActive = false }) => ($isActive ? 1 : 0)}px;
  border-style: dashed;
  border-color: ${({ $isActive = false }) => ($isActive ? MAIN_COLORS?.MAIN?.BLOCK_ACTIVE : "transparent")};
  overflow: hidden;

  padding-top: ${({ $paddingVertical = 0 }) => $paddingVertical}px;
  padding-bottom: ${({ $paddingVertical = 0 }) => $paddingVertical}px;

  padding-left: ${({ $paddingHorizontal = 0 }) => $paddingHorizontal}px;
  padding-right: ${({ $paddingHorizontal = 0 }) => $paddingHorizontal}px;
`;

export const ContainerSlide = ({ $item = null, $isActive = false }) => {
  // image only

  const totalSlides = _.get($item, ["totalSlides"]);
  const slideValues = _.get($item, ["slideValues"]);
  const slideStyle = _.get($item, ["slideStyle"]);

  const backgroundColor = _.get($item, ["backgroundColor"]);

  const borderTopLeftRadius = _.get($item, ["borderTopLeftRadius"]);
  const borderTopRightRadius = _.get($item, ["borderTopRightRadius"]);
  const borderBottomLeftRadius = _.get($item, ["borderBottomLeftRadius"]);
  const borderBottomRightRadius = _.get($item, ["borderBottomRightRadius"]);
  const paddingHorizontal = _.get($item, ["paddingHorizontal"]);
  const paddingVertical = _.get($item, ["paddingVertical"]);

  const delay = _.get($item, ["delay"]);
  const borderSlideRadius = _.get($item, ["borderSlideRadius"]);
  const renderSlide = _.chain(slideValues).take(totalSlides).value();

  return (
    <Container
      $backgroundColor={backgroundColor}
      $borderTopLeftRadius={borderTopLeftRadius}
      $borderTopRightRadius={borderTopRightRadius}
      $borderBottomLeftRadius={borderBottomLeftRadius}
      $borderBottomRightRadius={borderBottomRightRadius}
      $isActive={$isActive}
      $paddingHorizontal={paddingHorizontal}
      $paddingVertical={paddingVertical}
    >
      {(() => {
        switch (slideStyle) {
          case "FADE":
            return <FadeSlide $images={renderSlide} $delay={delay} $borderSlideRadius={borderSlideRadius} />;
          case "CARD":
            return <CardSlide $images={renderSlide} $delay={delay} $borderSlideRadius={borderSlideRadius} />;
          case "VERTICAL":
            return (
              <VerticalSlide $images={renderSlide} $delay={delay} $borderSlideRadius={borderSlideRadius} />
            );

          default:
            return (
              <DefaultSlide $images={renderSlide} $delay={delay} $borderSlideRadius={borderSlideRadius} />
            );
        }
      })()}
    </Container>
  );
};
