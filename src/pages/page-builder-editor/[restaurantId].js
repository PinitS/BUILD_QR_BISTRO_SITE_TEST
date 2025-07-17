import { Button } from "@components/Base/Button";
import { Container } from "@components/Base/Container";
import { Layout } from "@components/Base/Layout";
import { Modal } from "@components/Base/Modal";
import { ContainerEditorMenu } from "@components/Editor/ContainerEditorMenu";
import { setIsCollapseMenu } from "@redux/reducers/editor/isCollapseMenu.reducers";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default () => {
  const dispatch = useDispatch();
  return (
    <Layout>
      <Container>
        <ContainerEditorMenu />
        <Button
          $width={84}
          $height={42}
          $backgroundColor={"white"}
          onClick={() => dispatch(setIsCollapseMenu(false))}
        >
          SSSS
        </Button>

        <Modal>
          <div>sssssssss</div>
        </Modal>
      </Container>
    </Layout>
  );
};
