import { Text } from "@components/Base/Text";
import React from "react";
import { LOREM_IPSUM } from "statics/LOREM_IPSUM";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default () => {
  return (
    <Container>
      <div>
        {LOREM_IPSUM}
        {LOREM_IPSUM}
        {LOREM_IPSUM}
        {LOREM_IPSUM}
        {LOREM_IPSUM}
        {LOREM_IPSUM}
        {LOREM_IPSUM}
        {LOREM_IPSUM}
        {LOREM_IPSUM}
        {LOREM_IPSUM}
        {LOREM_IPSUM}
        {LOREM_IPSUM}
      </div>
    </Container>
  );
};
