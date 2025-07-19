import React, { useRef } from "react";
import styled from "styled-components";

import { useDraggable } from "@dnd-kit/core";
import _ from "lodash";
import { ContainerFreeformBlockText } from "./ContainerFreeformBlockText";
import { ContainerFreeformBlockImage } from "./ContainerFreeformBlockImage";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { setSelectedFreeformBlock } from "@redux/reducers/editor/selectedFreeformBlock.reducers";
import { setModalAttribute } from "@redux/reducers/base/modalAttribute.reducers";
import { setActiveMenu } from "@redux/reducers/editor/activeMenu.reducers";
import { setIsCollapseMenu } from "@redux/reducers/editor/isCollapseMenu.reducers";
import { EDITOR_DEFAULT_STYLE } from "statics/DEFAULT_STYLE";

const Container = styled.div`
  position: absolute;
  user-select: none;
  touch-action: none;
  cursor: grab;

  display: flex;
  justify-content: center;
  align-items: center;

  left: ${({ $x }) => `${$x}px`};
  top: ${({ $y }) => `${$y}px`};

  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};

  transform: ${({ $transform }) => $transform || "none"};
  /* background: #fff; */
  border-color: ${({ $isActive = false }) =>
    $isActive
      ? EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.SELECT_BORDER_COLOR_ACTIVE
      : EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.SELECT_BORDER_COLOR_INACTIVE};
  border-width: 2px;
  border-style: dotted;
  border-radius: 8px;
  overflow: hidden;
`;

export const ContainerFreeformBlocks = ({ $item, $containerWidth, $containerHeight }) => {
  const dispatch = useDispatch();

  const selectedFreeformBlock = useSelector((state) => state?.selectedFreeformBlock?.data, shallowEqual);

  const ref = useRef(null);
  const id = _.get($item, ["id"]);
  const type = _.get($item, ["type"]);
  const ocw = _.get($item, ["ocw"]);
  const och = _.get($item, ["och"]);
  const attribute = _.get($item, ["attribute"]);
  const scaleW = $containerWidth / ocw;
  const scaleH = $containerHeight / och;

  const x = _.get(attribute, ["x"]);
  const y = _.get(attribute, ["y"]);

  const width = _.get(attribute, ["width"]) * scaleW;
  const height = _.get(attribute, ["height"]) * scaleH;
  const isActive = _.get(selectedFreeformBlock, ["id"]) === id;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const handleSelectBlock = () => {
    batch(() => {
      dispatch(setIsCollapseMenu(isActive ? true : false));
      dispatch(setSelectedFreeformBlock(isActive ? null : $item));
    });
  };

  return (
    <Container
      onClick={() => handleSelectBlock()}
      ref={(el) => {
        setNodeRef(el);
        ref.current = el;
      }}
      {...listeners}
      {...attributes}
      $isActive={isActive}
      $x={x}
      $y={y}
      $width={width}
      $height={height}
      $transform={transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined}
    >
      {(() => {
        switch (type) {
          case "TEXT":
            return <ContainerFreeformBlockText key="TEXT" $item={$item} />;
          case "IMAGE":
            return <ContainerFreeformBlockImage key="IMAGE" $item={$item} />;
          default:
            return null;
        }
      })()}
    </Container>
  );
};
