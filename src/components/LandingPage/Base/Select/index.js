import React from "react";
import SelectLib from "react-select";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import { Text } from "@components/LandingPage/Base/Text";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

export const Select = ({
  $name = "",
  $label = "",
  $isShowLabel = true,
  $color = MAIN_COLORS?.MAIN?.INPUT_DEFAULT_COLOR,
  $labelColor = MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR,
  $height = MAIN_SIZE.INPUT_DEFAULT_HEIGHT,
  $fontFamily = "IBMPlexSansThai",
  $control,
  $options = [],
  $isMulti = false,
  $placeholder = "Select...",
  $disabled = false,
  ...rest
}) => {
  const findOption = (val) => {
    if ($isMulti && Array.isArray(val)) {
      return val.map((v) => $options.find((opt) => opt.value === v)).filter(Boolean);
    }
    return $options.find((opt) => opt.value === val) || null;
  };

  return (
    <Container>
      <Controller
        name={$name}
        control={$control}
        render={({ field: { onChange, value, ref } }) => {
          return (
            <>
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
              <SelectLib
                menuPortalTarget={document.body}
                inputRef={ref}
                value={findOption(value)}
                onChange={(selected) => {
                  if ($isMulti) {
                    const values = Array.isArray(selected) ? selected.map((s) => s.value) : [];
                    onChange(values);
                  } else {
                    onChange(selected?.value || null);
                  }
                }}
                options={$options}
                isMulti={$isMulti}
                placeholder={$placeholder}
                isDisabled={$disabled}
                {...rest}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    height: $height,
                    borderRadius: 8,
                    fontFamily: "IBMPlexSansThai",
                    fontSize: 16,
                    borderColor: state.isFocused ? "#f2f2f2" : base.borderColor,
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: state.isFocused ? "#f2f2f2" : base.borderColor,
                    },
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? "#f2f2f2" : state.isFocused ? "#f2f2f2" : "#fff",
                    fontFamily: "IBMPlexSansThai",
                    fontSize: 14,
                    color: $color,
                    cursor: "pointer",
                    "&:active": {
                      backgroundColor: "#f2f2f2",
                      color: $color,
                    },
                  }),
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                  menuList: (base) => ({
                    ...base,
                    padding: 0,
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: 8,
                    overflow: "hidden",
                  }),
                }}
              />
            </>
          );
        }}
      />
    </Container>
  );
};
