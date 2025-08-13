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
export const ContainerText = ({ $attribute = null, $isActive = false }) => {
  const value = _.get($attribute, ["value"]);
  const color = _.get($attribute, ["color"]);
  const fontSize = _.get($attribute, ["fontSize"]);

  const fontWeight = _.get($attribute, ["fontWeight"]);
  const fontFamily = _.get($attribute, ["fontFamily"]);
  const textAlign = _.get($attribute, ["textAlign"]);

  const justifyContent = _.get($attribute, ["justifyContent"]);
  const alignItems = _.get($attribute, ["alignItems"]);

  const backgroundColor = _.get($attribute, ["backgroundColor"]);

  const borderTopLeftRadius = _.get($attribute, ["borderTopLeftRadius"]);
  const borderTopRightRadius = _.get($attribute, ["borderTopRightRadius"]);
  const borderBottomLeftRadius = _.get($attribute, ["borderBottomLeftRadius"]);
  const borderBottomRightRadius = _.get($attribute, ["borderBottomRightRadius"]);

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
