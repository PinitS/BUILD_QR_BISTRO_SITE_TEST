import { Text } from "@components/LandingPage/Base/Text";
import { isDarkHex } from "@utils/isDarkHex";
import _ from "lodash";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
`;
export const ContainerEmpty = ({ $attribute = null }) => {
  const backgroundColor = _.get($attribute, ["backgroundColor"]);
  return (
    <Container $backgroundColor={backgroundColor}>
      <Text $fontWeight={400} $color={isDarkHex({ hexColor: backgroundColor }) ? "#FFFFFF" : "#17171B"}>
        Empty
      </Text>
    </Container>
  );
};
