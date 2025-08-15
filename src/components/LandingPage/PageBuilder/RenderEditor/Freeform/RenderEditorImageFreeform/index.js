import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useDraggable } from "@dnd-kit/core";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import Image from "next/image";
import { MAIN_ATTR } from "statics/PAGE_BUILDER_ATTRIBUTE";
import { resolveImageFilter } from "@utils/resolve/resolveImageFilter";
import { setSelectedStackBlockColumnItem } from "@redux/reducers/selectedStackBlockColumnItem.reducers";
import { PlaceHolderImage } from "@components/LandingPage/Base/Image/PlaceHolderImage";

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
  width: ${({ $w }) => `${$w}px`};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};

  background-color: ${({ $backgroundColor }) => $backgroundColor};
  transform: ${({ $transform }) => $transform || "none"};
  border-radius: ${({ $radius }) => $radius}px;

  border-width: 1px;
  border-style: dashed;
  border-color: ${({ $isActive = false }) =>
    $isActive ? MAIN_COLORS?.MAIN?.BLOCK_ACTIVE : MAIN_COLORS?.MAIN?.BLOCK_INACTIVE};

  overflow: hidden;
  z-index: 2;
  box-sizing: border-box;
`;

const ContainerBlankImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #ededed;
`;

export const RenderEditorImageFreeform = ({ $item }) => {
  const dispatch = useDispatch();
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const importBlockAttr = useSelector((state) => state?.importBlockAttr?.data, shallowEqual);

  const id = _.get($item, ["id"]);
  const value = _.get($item, ["value"]);
  const aspectRatio = _.get($item, ["aspectRatio"]);
  const resize = _.get($item, ["resize"], "contain");
  const backgroundColor = _.get($item, ["backgroundColor"]);
  const filterType = _.get($item, ["filterType"]);
  const filterValue = _.get($item, ["filterValue"]);

  const filterImage = resolveImageFilter({ filterType, filterValue });

  const radius = _.get($item, ["radius"]);

  const x = _.get($item, ["x"]);
  const y = _.get($item, ["y"]);
  const size = _.get($item, ["size"]);

  const isActive = _.get(customizeBlockAttr, ["id"]) === id && _.get(customizeBlockAttr, ["isVisible"]);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const handleSelectBlock = () => {
    const updateSelectedFreeformBlock = isActive
      ? { ...customizeBlockAttr, isVisible: false }
      : { isVisible: true, id, form: "CUSTOMIZE-FREEFORM-IMAGE" };
    batch(() => {
      dispatch(setSelectedStackBlockColumnItem(null));
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
      $x={x}
      $y={y}
      $w={size}
      $aspectRatio={aspectRatio}
      $backgroundColor={backgroundColor}
      $radius={(radius / 100) * size}
      $transform={transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined}
    >
      {_.isNil(value) && <PlaceHolderImage />}

      {!_.isNil(value) && (
        <Image
          alt={MAIN_ATTR?.IMAGE_ALT}
          fill
          style={{ objectFit: resize, filter: filterImage, borderRadius: "inherit" }}
          src={value}
        />
      )}
    </ContainerDraggable>
  );
};
