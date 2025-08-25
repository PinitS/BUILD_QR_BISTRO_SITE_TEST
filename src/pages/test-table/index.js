import { RenderViewTable } from "@components/LandingPage/PageBuilder/RenderView/Stack/RenderViewTable";
import React from "react";
import styled from "styled-components";

const Layouts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
  background-image: ${({ $backgroundImage }) => ($backgroundImage ? `url(${$backgroundImage})` : "none")};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1024px;
  min-height: 100vh;
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
`;

export default () => {
  return (
    <Layouts>
      <Container>
        <RenderViewTable />
      </Container>
    </Layouts>
  );
};
