import React from "react";
import { Controller } from "react-hook-form";
import RcSlider from "rc-slider";
import styled from "styled-components";
import { EDITOR_DEFAULT_STYLE } from "statics/DEFAULT_STYLE";
import { Text } from "@components/Base/Text";
import "rc-slider/assets/index.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const ContainerSlider = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const StyledSlider = styled(RcSlider)`
  .rc-slider-rail {
    height: 8px;
    background-color: #ccc;
  }

  .rc-slider-track {
    background-color: ${EDITOR_DEFAULT_STYLE?.SLIDER?.TRACK_COLOR};
    height: 8px;
  }

  .rc-slider-handle {
    border: solid 2px ${EDITOR_DEFAULT_STYLE?.SLIDER?.HANDLE_COLOR};
    width: 16px;
    height: 16px;
    margin-top: -4px;
    background-color: white;
    opacity: 1;
  }

  .rc-slider-handle:hover {
    border-color: ${EDITOR_DEFAULT_STYLE?.SLIDER?.HANDLE_COLOR};
  }

  .rc-slider-handle:active {
    border-color: ${EDITOR_DEFAULT_STYLE?.SLIDER?.HANDLE_COLOR};
    box-shadow: none;
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }

  .rc-slider-dot-active {
    border-color: none;
  }

  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: ${EDITOR_DEFAULT_STYLE?.SLIDER?.HANDLE_COLOR};
    box-shadow: none;
  }
`;

export const Slider = ({
  $control,
  $name = "",
  $label = "",
  $isShowLabel = true,
  $height = EDITOR_DEFAULT_STYLE.INPUT_DEFAULT_HEIGHT,
  $min = 0,
  $max = 100,
}) => {
  return (
    <Container>
      <Controller
        control={$control}
        name={$name}
        render={({ field }) => (
          <>
            {$isShowLabel && (
              <Text $fontSize={14} $textTransform="uppercase" $fontWeight={500}>
                {`${$label} (${field.value})`}
              </Text>
            )}
            <ContainerSlider>
              <StyledSlider
                {...field}
                min={$min}
                max={$max}
                onChange={(value) => field.onChange(value)}
                value={field.value}
              />
            </ContainerSlider>
          </>
        )}
      />
    </Container>
  );
};
