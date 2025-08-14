import { Text } from "@components/LandingPage/Base/Text";
import _ from "lodash";
import React from "react";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: ${({ $justifyContent = "flex-start" }) => $justifyContent};
  align-items: ${({ $alignItems = "flex-start" }) => $alignItems};
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
  border-top-right-radius: ${({ $borderTopRightRadius = 0 }) => $borderTopRightRadius}px;
  border-top-left-radius: ${({ $borderTopLeftRadius = 0 }) => $borderTopLeftRadius}px;
  border-bottom-right-radius: ${({ $borderBottomRightRadius = 0 }) => $borderBottomRightRadius}px;
  border-bottom-left-radius: ${({ $borderBottomLeftRadius = 0 }) => $borderBottomLeftRadius}px;
  border-width: ${({ $isActive = false }) => ($isActive ? 1 : 0)}px;
  border-style: dashed;
  border-color: ${({ $isActive = false }) => ($isActive ? MAIN_COLORS?.MAIN?.BLOCK_ACTIVE : "transparent")};
  overflow: scroll;
`;
export const ContainerText = ({ $item = null, $isActive = false }) => {
  const value = _.get($item, ["value"]);
  const color = _.get($item, ["color"]);
  const fontSize = _.get($item, ["fontSize"]);

  const fontWeight = _.get($item, ["fontWeight"]);
  const fontFamily = _.get($item, ["fontFamily"]);
  const textAlign = _.get($item, ["textAlign"]);

  const justifyContent = _.get($item, ["justifyContent"]);
  const alignItems = _.get($item, ["alignItems"]);

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
      $justifyContent={justifyContent}
      $alignItems={alignItems}
    >
      <Text
        $ellipsis={false}
        $fontFamily={fontFamily}
        $fontWeight={fontWeight}
        $color={color}
        $fontSize={fontSize}
        $align={textAlign}
      >
        {value}
      </Text>
    </Container>
  );
};
