import React, { useState } from "react";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import ReactSlider from "react-slider";
import { Text } from "@components/LandingPage/Base/Text";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  $isShowLabel = true,
  $isShowValue = true,
  $fontFamily = "IBMPlexSansThai",
}) => {
  const [value, setValue] = useState(10);
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
          <StyledSlider
            value={value}
            onChange={setValue}
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
            min={1}
            max={100}
          />
          {$isShowValue && (
            <Text
              style={{ width: 50 }}
              $align="center"
              $fontFamily={$fontFamily}
              $color={$labelColor}
              $fontSize={14}
              $textTransform="uppercase"
              $fontWeight={500}
            >
              {value}
            </Text>
          )}
        </ContainerSlide>
      </React.Fragment>
    </Container>
  );
};
