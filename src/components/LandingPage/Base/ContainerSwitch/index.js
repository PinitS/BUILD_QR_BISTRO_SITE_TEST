import React from "react";
import styled from "styled-components";
import { Text } from "../Text";
import { Switch } from "../Switch";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerSwitch = ({ $label, $name, $control }) => {
  return (
    <Container>
      <Text
        $textTransform="uppercase"
        $fontWeight={600}
        $fontSize={14}
        $color={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
      >
        {$label}
      </Text>
      <Switch $name={$name} $control={$control} />
    </Container>
  );
};
