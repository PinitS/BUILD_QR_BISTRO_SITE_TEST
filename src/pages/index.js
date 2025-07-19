import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  background: red;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const AbsoluteBox = styled.div`
  position: absolute;
  background: green;
  width: 5%;
  height: 5%;
`;

export default () => {
  return (
    <Container>
      <AbsoluteBox />
    </Container>
  );
};
