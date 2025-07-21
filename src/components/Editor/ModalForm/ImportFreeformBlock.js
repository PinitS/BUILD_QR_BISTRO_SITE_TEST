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
import {
  initialFreeformImageAttribute,
  initialFreeformTextAttribute,
  initialImportFreeform,
} from "@utils/importFreeform";
import { fitPxW } from "@utils/resolve/resolveSize";

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

export const ImportFreeformBlock = ({ $containerWidth, $containerHeight }) => {
  const dispatch = useDispatch();
  const modalAttribute = useSelector((state) => state?.modalAttribute?.data, shallowEqual);
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);

  const handleSelectItem = ({ value }) => {
    const scale = fitPxW({ containerWidth: $containerWidth });
    const initialX = Math.round(31 * scale);
    const initialY = Math.round(31);

    const initialAttribute =
      value === "TEXT"
        ? initialFreeformTextAttribute({ containerWidth: $containerWidth })
        : initialFreeformImageAttribute({ containerWidth: $containerWidth });

    const initial = {
      id: uuidv4(),
      type: value,
      x: initialX,
      y: initialY,
      attribute: { ...initialAttribute },
    };
    batch(() => {
      dispatch(setFreeformBlocks([...freeformBlocks, initial]));
      dispatch(setActiveMenu(null));
      dispatch(setModalAttribute({ ...modalAttribute, isVisible: false }));
    });
  };

  return (
    <Container>
      <ContainerHeader>
        <Text $fontSize={18} $fontWeight={500}>
          Import absolute
        </Text>
        <Line />
      </ContainerHeader>
      {_.map(SELECT_LIST, (item, index) => {
        const value = _.get(item, ["value"]);
        return (
          <ContainerSelectItem
            disabled={value !== "TEXT"}
            key={index}
            onClick={() => handleSelectItem({ value })}
          >
            <Text
              $color={EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.SELECT_TEXT_COLOR}
              $fontSize={16}
              $fontWeight={400}
            >
              {_.get(item, ["label"])}
            </Text>
          </ContainerSelectItem>
        );
      })}
    </Container>
  );
};
