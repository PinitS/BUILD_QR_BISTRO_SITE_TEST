import { Text } from "@components/LandingPage/Base/Text";
import { isDarkHex } from "@utils/isDarkHex";
import _ from "lodash";
import React from "react";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
  border-top-right-radius: ${({ $borderTopRightRadius = 0 }) => $borderTopRightRadius}px;
  border-top-left-radius: ${({ $borderTopLeftRadius = 0 }) => $borderTopLeftRadius}px;
  border-bottom-right-radius: ${({ $borderBottomRightRadius = 0 }) => $borderBottomRightRadius}px;
  border-bottom-left-radius: ${({ $borderBottomLeftRadius = 0 }) => $borderBottomLeftRadius}px;
  overflow: hidden;
  border-width: ${({ $isActive = false }) => ($isActive ? 1 : 0)}px;
  border-style: dashed;
  border-color: ${({ $isActive = false }) => ($isActive ? MAIN_COLORS?.MAIN?.BLOCK_ACTIVE : "transparent")};
`;
export const ContainerEmpty = ({ $item = null, $isActive = false }) => {
  const backgroundColor = _.get($item, ["backgroundColor"]);

  const borderTopLeftRadius = _.get($item, ["borderTopLeftRadius"]);
  const borderTopRightRadius = _.get($item, ["borderTopRightRadius"]);
  const borderBottomLeftRadius = _.get($item, ["borderBottomLeftRadius"]);
  const borderBottomRightRadius = _.get($item, ["borderBottomRightRadius"]);

  return (
    <Container
      $backgroundColor={backgroundColor}
      $borderTopLeftRadius={borderTopLeftRadius}
      $borderTopRightRadius={borderTopRightRadius}
      $borderBottomLeftRadius={borderBottomLeftRadius}
      $borderBottomRightRadius={borderBottomRightRadius}
      $isActive={$isActive}
    >
      <Text $fontWeight={400} $color={isDarkHex({ hexColor: backgroundColor }) ? "#FFFFFF" : "#17171B"}>
        Empty
      </Text>
    </Container>
  );
};
