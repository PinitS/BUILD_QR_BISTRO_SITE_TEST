import React from "react";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { addSuffix } from "@utils/addSuffix";
import { Text } from "@components/Base/Text";
import { EDITOR_DEFAULT_STYLE } from "statics/DEFAULT_STYLE";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const ContainerInput = styled.div`
  position: relative;
  width: 100%;
  height: ${({ $height = EDITOR_DEFAULT_STYLE?.INPUT_DEFAULT_HEIGHT }) => $height}px;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  outline: none;
  padding-left: 12px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ $error }) => ($error ? `${EDITOR_DEFAULT_STYLE?.INPUT?.ERROR_COLOR}` : `#f2f2f2`)};
  font-family: "IBMPlexSansThai";
  font-size: 16px;
  color: ${({ $error }) =>
    $error ? EDITOR_DEFAULT_STYLE?.INPUT?.ERROR_COLOR : EDITOR_DEFAULT_STYLE?.INPUT?.PRIMARY_COLOR};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:focus {
    border-color: ${EDITOR_DEFAULT_STYLE?.DEFAULT_BORDER_COLOR} !important;
    outline: none !important;
  }
`;

const ErrorText = styled.div`
  position: absolute;
  bottom: 2px;
  right: 6px;
  font-family: "IBMPlexSansThai";
  font-size: ${({ $fontSize }) => addSuffix($fontSize) || "12px"};
  color: ${EDITOR_DEFAULT_STYLE?.INPUT?.ERROR_COLOR};
`;

export const Input = ({
  $control,
  $name = "",
  $label = "",
  $placeholder = "",
  $isShowLabel = true,
  $height = EDITOR_DEFAULT_STYLE.INPUT_DEFAULT_HEIGHT,
  $rules = {},
  $secureTextEntry = false,
  $keyboardType = "text",
  disabled = false,
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
              <Text $fontSize={14} $textTransform="uppercase" $fontWeight={500}>
                {$label}
              </Text>
            )}
            <ContainerInput $height={$height}>
              <StyledInput
                ref={ref}
                disabled={disabled}
                $error={error}
                placeholder={$placeholder}
                type={$secureTextEntry ? "password" : $keyboardType}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                autoComplete="off"
              />
              {error && <ErrorText $fontSize={14}>{error?.message}</ErrorText>}
            </ContainerInput>
          </>
        )}
      />
    </Container>
  );
};
