import React, { useState } from "react";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import ReactSlider from "react-slider";
import { Text } from "@components/LandingPage/Base/Text";
import { Controller } from "react-hook-form";
import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const ContainerSlide = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
  align-items: center;
`;

const StyledSlider = styled(ReactSlider)`
  flex: 1;
  height: 4px;
`;

const Thumb = styled.div`
  height: 16px;
  aspect-ratio: 1;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-color: ${MAIN_COLORS?.BUTTON?.TEXT};
  background: ${MAIN_COLORS?.BUTTON?.BACKGROUND};

  cursor: grab;
  margin-top: -5px;
  outline: none;
`;

const Track = styled.div`
  top: 0;
  bottom: 0;
  border-radius: 4px;
  height: 6px;
  background: green;
  background: ${MAIN_COLORS?.BUTTON?.TEXT};
  background: ${({ $isPassed }) =>
    $isPassed ? MAIN_COLORS?.BUTTON?.TEXT : `${MAIN_COLORS?.BUTTON?.TEXT}99`};
`;

export const Slide = ({
  $control,
  $name,
  $label = "xxx",
  $labelColor = MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR,
  $min = 1,
  $max,
  $valueIndicator,
  $isShowLabel = true,
  $isShowValue = true,
  $fontFamily = "IBMPlexSansThai",
}) => {
  console.log("max :>> ", $max);
  return (
    <Container>
      <React.Fragment>
        {$isShowLabel && (
          <Text
            $fontFamily={$fontFamily}
            $color={$labelColor}
            $fontSize={14}
            $textTransform="uppercase"
            $fontWeight={500}
          >
            {$label}
          </Text>
        )}
        <ContainerSlide>
          <Controller
            control={$control}
            name={$name}
            render={({ field: { value, onChange } }) => {
              return (
                <React.Fragment>
                  <StyledSlider
                    value={value}
                    onChange={onChange}
                    renderThumb={(props, state) => {
                      const { key, ...rest } = props;
                      return <Thumb key={key} {...rest} />;
                    }}
                    renderTrack={(props, state) => {
                      const { key, ...rest } = props;
                      console.log("state :>> ", state);
                      const passed = state.index === 0;
                      return <Track key={key} {...rest} $isPassed={passed} />;
                    }}
                    min={$min}
                    max={$max}
                  />
                  {$isShowValue && (
                    <Text
                      style={{ width: 25 }}
                      $align="center"
                      $fontFamily={$fontFamily}
                      $color={$labelColor}
                      $fontSize={14}
                      $textTransform="uppercase"
                      $fontWeight={500}
                    >
                      {$valueIndicator}
                      {/* {(((value * 2) / $scaleMaxValue) * 100).toFixed(0)} */}
                    </Text>
                  )}
                </React.Fragment>
              );
            }}
          />
        </ContainerSlide>
      </React.Fragment>
    </Container>
  );
};
