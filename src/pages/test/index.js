import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 475px;
  height: 100%;
  background: green;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2px;
`;

const ContainerItem = styled.div`
  width: 50%;
  height: 50px;
  background: red;
`;

export default () => {
  return (
    <Layout>
      <Container>
        <ContainerItem />
        <ContainerItem />
      </Container>
    </Layout>
  );
};
