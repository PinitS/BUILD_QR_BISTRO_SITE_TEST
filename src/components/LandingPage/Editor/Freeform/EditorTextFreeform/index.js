import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useDraggable } from "@dnd-kit/core";
import { setMainSideMenuAttr } from "@redux/reducers/mainSideMenuAttr.reducers";

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

  transform: ${({ $transform }) => $transform || "none"};
  border-width: 2px;
  border-style: dotted;
  border-radius: 4px;
  overflow: hidden;
  z-index: 2;
`;

export const EditorTextFreeform = ({ $item }) => {
  const dispatch = useDispatch();
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const mainSideMenuAttr = useSelector((state) => state?.mainSideMenuAttr?.data, shallowEqual);
  const id = _.get($item, ["id"]);
  const attribute = _.get($item, ["attribute", selectedLayoutDesign]);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const handleSelectBlock = () => {
    batch(() => {
      dispatch(setMainSideMenuAttr({ ...mainSideMenuAttr, isVisible: false }));
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
      // $isActive={isActive}
      $x={attribute.x}
      $y={attribute.y}
      $transform={transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined}
    >
      index
    </ContainerDraggable>
  );
};
