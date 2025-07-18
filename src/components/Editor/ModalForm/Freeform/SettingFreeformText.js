import { Button } from "@components/Base/Button";
import { Text } from "@components/Base/Text";
import { setModalAttribute } from "@redux/reducers/base/modalAttribute.reducers";
import { setFreeformBlocks } from "@redux/reducers/editor/freeformBlocks.reducers";
import { setActiveMenu } from "@redux/reducers/editor/activeMenu.reducers";
import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { EDITOR_DEFAULT_STYLE } from "statics/DEFAULT_STYLE";

const Container = styled.div`
  width: 324px;
  background: ${EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.BACKGROUND};
  border-radius: 18px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${EDITOR_DEFAULT_STYLE?.LINE_COLOR};
`;

const ContainerSelectItem = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 68px;
  background: ${EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.SELECT_BACKGROUND_COLOR};
  border-color: ${EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.SELECT_BORDER_COLOR_INACTIVE};
  border-width: 1px;
  border-style: dashed;
  border-radius: 8px;
`;

const SELECT_LIST = [
  { label: "TEXT", value: "TEXT" },
  { label: "IMAGE", value: "IMAGE" },
];

export const ImportFreeformBlock = () => {
  const dispatch = useDispatch();
  const modalAttribute = useSelector((state) => state?.modalAttribute?.data, shallowEqual);
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);

  return (
    <Container>
      <ContainerHeader>
        <Text $fontSize={18} $fontWeight={500}>
          Setting Text
        </Text>
        <Line />
      </ContainerHeader>
    </Container>
  );
};
