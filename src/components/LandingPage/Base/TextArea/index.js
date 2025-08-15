import React from "react";
import { Controller } from "react-hook-form";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import { Text } from "../Text";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const ContainerInput = styled.div`
  position: relative;
  width: 100%;
  height: ${({ $height }) => $height}px;
  display: flex;
  align-items: center;
`;

const StyledTextArea = styled.textarea`
  flex: 1;
  width: 100%;
  height: 100%;

  border: none;
  border-radius: 8px;
  outline: none;
  padding-left: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ $error }) => ($error ? `${MAIN_COLORS?.MAIN?.ERROR_COLOR}` : `#f2f2f2`)};
  font-family: "IBMPlexSansThai";
  font-size: 16px;

  resize: none;
  color: ${({ $error, $color }) => ($error ? MAIN_COLORS?.MAIN?.ERROR_COLOR : $color)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:focus {
    border-color: ${MAIN_COLORS?.MAIN?.BORDER_DEFAULT_COLOR} !important;
    outline: none !important;
  }
`;

const ErrorText = styled.div`
  position: absolute;
  bottom: 2px;
  right: 6px;
  font-family: "IBMPlexSansThai";
  font-size: ${({ $fontSize = 12 }) => (typeof $fontSize === "number" ? `${$fontSize}px` : $fontSize)};
  color: ${MAIN_COLORS?.MAIN?.ERROR_COLOR};
`;

export const TextArea = ({
  $control,
  $name = "",
  $label = "",
  $placeholder = "",
  $height = MAIN_SIZE.INPUT_DEFAULT_HEIGHT * 2,
  $keyboardType = "text",
  $fontFamily = "Sen",
  $labelColor = MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR,
  $rules = {},
  $isShowLabel = true,
}) => {
  return (
    <Container>
      <Controller
        control={$control}
        name={$name}
        rules={$rules}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
          <>
            {$isShowLabel && (
              <Text
                $fontFamily={$fontFamily}
                $color={$labelColor}
                $fontSize={14}
                $textTransform="capitalize"
                $fontWeight={500}
              >
                {$label}
              </Text>
            )}
            <ContainerInput $height={$height}>
              <StyledTextArea
                ref={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={$placeholder}
                $height={$height}
              />

              {error && <ErrorText $fontSize={14}>{error?.message}</ErrorText>}
            </ContainerInput>
          </>
        )}
      />
    </Container>
  );
};
