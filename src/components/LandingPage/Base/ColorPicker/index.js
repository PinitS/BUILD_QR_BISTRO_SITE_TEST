import React from "react";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import _ from "lodash";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import { Text } from "@components/LandingPage/Base/Text";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ColorGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: ${({ $spacing = 8 }) => $spacing}px;
`;

const ColorBox = styled.div`
  width: ${(props) => `calc((100% - ${(props.$columns - 1) * props.$spacing}px) / ${props.$columns})`};
  aspect-ratio: 1;
  border-radius: 4px;
  background-color: ${({ $color }) => $color};
  border: 1px solid #fafafa;
  cursor: pointer;
  box-sizing: border-box;
`;

const ContainerManual = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 2px;
`;

const StyledInput = styled.input`
  width: 50%;
  height: ${MAIN_SIZE?.INPUT_DEFAULT_HEIGHT - 10}px;
  border-radius: 6px;
  outline: none;
  padding-left: 12px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ $error }) => ($error ? `${MAIN_COLORS?.MAIN?.ERROR_COLOR}` : `#f2f2f2`)};
  font-family: "IBMPlexSansThai";
  font-size: 14px;
  color: ${({ $error, $color }) => ($error ? MAIN_COLORS?.MAIN?.ERROR_COLOR : $color)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:focus {
    border-color: ${MAIN_COLORS?.MAIN?.BORDER_DEFAULT_COLOR} !important;
    outline: none !important;
  }
`;

const CurrentColor = styled.div`
  height: ${MAIN_SIZE?.INPUT_DEFAULT_HEIGHT - 10}px;
  aspect-ratio: 1;
  border-radius: 4px;
  background-color: ${({ $color }) => $color};
  border-width: 1px;
  border-style: solid;
  border-color: ${MAIN_COLORS?.MAIN?.BORDER_DEFAULT_COLOR} !important;
`;

const Transparent = styled.div`
  position: relative;
  height: ${MAIN_SIZE?.INPUT_DEFAULT_HEIGHT - 10}px;
  aspect-ratio: 1;
  border-width: 1px;
  border-style: solid;
  border-color: ${MAIN_COLORS?.MAIN?.BORDER_DEFAULT_COLOR} !important;
  border-radius: 4px;
  background: #fafafa;
  cursor: pointer;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 140%;
    height: 2px;
    background: red;
    transform: rotate(-45deg);
    top: 50%;
    left: 50%;
    transform-origin: center;
    translate: -50% -50%;
    pointer-events: none;
  }

  &:hover {
    background: #f5f5f5;
  }
`;

const COLORS = [
  "#000000",
  "#474747",
  "#5C5C5C",
  "#707070",
  "#999999",
  "#ADADAD",
  "#D6D6D6",
  "#FFFFFF",
  //
  "#2C0977",
  "#61187C",
  "#791A3D",
  "#B51A00",
  "#AD3E00",
  "#A96800",
  "#A67B01",
  "#C4BC00",
  //
  "#5E30EB",
  "#BE38F3",
  "#E63B7A",
  "#FE6250",
  "#FE8648",
  "#FEB43F",
  "#FECB3E",
  "#FFF76B",
  // //
  // "#B18CFE",
  // "#E292FE",
  // "#F4A4C0",
  // "#FFB5AF",
  // "#FFC5AB",
  // "#FED9A8",
  // "#FDE4A8",
  // "#FFFBB9",
];

export const ColorPicker = ({
  $control,
  $name,
  $label = "",
  $labelColor = MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR,
  $color = MAIN_COLORS?.MAIN?.INPUT_DEFAULT_COLOR,
  $isShowLabel = true,
  $fontFamily = "IBMPlexSansThai",
  $spacing = 8,
  $columns = 8,
}) => {
  return (
    <Container>
      <Controller
        control={$control}
        name={$name}
        render={({ field: { value, onChange } }) => {
          return (
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
              <ColorGrid $spacing={$spacing}>
                {_.map(COLORS, (color) => (
                  <ColorBox
                    key={color}
                    $color={color}
                    $spacing={$spacing}
                    $columns={$columns}
                    onClick={() => onChange(color)}
                  />
                ))}
              </ColorGrid>
              <ContainerManual>
                <StyledInput
                  $color={$color}
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  autoComplete="off"
                />
                <CurrentColor $color={value} />
                <Transparent onClick={() => onChange("transparent")} />
              </ContainerManual>
            </React.Fragment>
          );
        }}
      />
    </Container>
  );
};
