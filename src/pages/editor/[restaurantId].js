import { Container } from "@components/Base/Container";
import { Layout } from "@components/Base/Layout";
import { ContainerEditorMenu } from "@components/Editor/ContainerEditorMenu";
import React from "react";
import styled from "styled-components";

export default () => {
  return (
    <Layout>
      <Container>
        <ContainerEditorMenu />
      </Container>
    </Layout>
  );
};
