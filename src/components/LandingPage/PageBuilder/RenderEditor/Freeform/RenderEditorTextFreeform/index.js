import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useDraggable } from "@dnd-kit/core";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import { Text } from "@components/LandingPage/Base/Text";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";

const ContainerDraggable = styled.div`
  position: absolute;
  user-select: none;
  touch-action: none;
  cursor: grab;

  display: flex;
  justify-content: center;
  align-items: center;

  left: ${({ $x }) => `${$x}px`};
  top: ${({ $y }) => `${$y}px`};
  border-color: ${({ $isActive = false }) =>
    $isActive ? MAIN_COLORS?.MAIN?.BLOCK_ACTIVE : MAIN_COLORS?.MAIN?.BLOCK_INACTIVE};

  transform: ${({ $transform }) => $transform || "none"};
  border-width: 2px;
  border-style: dotted;
  border-radius: 4px;
  overflow: hidden;
  z-index: 2;
`;

export const RenderEditorTextFreeform = ({ $item }) => {
  const dispatch = useDispatch();
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const importBlockAttr = useSelector((state) => state?.importBlockAttr?.data, shallowEqual);

  const id = _.get($item, ["id"]);
  const type = _.get($item, ["type"]);
  const value = _.get($item, ["value"]);
  const color = _.get($item, ["color"]);

  const attribute = _.get($item, ["attribute", selectedLayoutDesign]);
  const x = _.get(attribute, ["x"]);
  const y = _.get(attribute, ["y"]);
  const fontSize = _.get(attribute, ["fontSize"]);
  const fontWeight = _.get(attribute, ["fontWeight"]);
  const fontFamily = _.get(attribute, ["fontFamily"]);

  const isActive = _.get(customizeBlockAttr, ["id"]) === id && _.get(customizeBlockAttr, ["isVisible"]);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const handleSelectBlock = () => {
    const updateSelectedFreeformBlock = isActive
      ? { ...customizeBlockAttr, isVisible: false }
      : { isVisible: true, id, type, block: "FREEFORM" };
    batch(() => {
      dispatch(setCustomizeBlockAttr(updateSelectedFreeformBlock));
      dispatch(setImportBlockAttr({ ...importBlockAttr, isVisible: false }));
    });
  };

  return (
    <ContainerDraggable
      onClick={() => handleSelectBlock()}
      ref={(el) => {
        setNodeRef(el);
      }}
      {...listeners}
      {...attributes}
      $isActive={isActive}
      $x={attribute?.x}
      $y={attribute?.y}
      $transform={transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined}
    >
      <Text $color={color} $fontSize={attribute?.size}>
        {_.isEmpty(value) ? "Click Me To Edit" : value}
      </Text>
    </ContainerDraggable>
  );
};
