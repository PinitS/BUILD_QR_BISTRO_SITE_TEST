import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useDraggable } from "@dnd-kit/core";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { getAngleFromAspectRatio } from "@utils/getAngleFromAspectRatio";
import { BlankImagePlaceHolder } from "@components/LandingPage/Base/Image/BlankImagePlaceHolder";
import { ImageWrapper } from "@components/LandingPage/Base/Image/ImageWrapper";
import Image from "next/image";
import { MAIN_ATTR } from "statics/PAGE_BUILDER_ATTRIBUTE";
import { resolveImageFilter } from "@utils/resolve/resolveImageFilter";

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

  const attribute = _.get($item, ["attribute", selectedLayoutDesign]);
  const x = _.get(attribute, ["x"]);
  const y = _.get(attribute, ["y"]);
  const size = _.get(attribute, ["size"]);

  const angle = getAngleFromAspectRatio(aspectRatio);

  const isActive = _.get(customizeBlockAttr, ["id"]) === id && _.get(customizeBlockAttr, ["isVisible"]);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const handleSelectBlock = () => {
    const updateSelectedFreeformBlock = isActive
      ? { ...customizeBlockAttr, isVisible: false }
      : { isVisible: true, id, form: "CUSTOMIZE-FREEFORM-IMAGE" };
    batch(() => {
      dispatch(setCustomizeBlockAttr(updateSelectedFreeformBlock));
      dispatch(setImportBlockAttr({ ...importBlockAttr, isVisible: false }));
    });
  };

  return (
    <ContainerDraggable
      id={id}
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
      $backgroundColor={backgroundColor}
      $radius={(radius / 100) * size}
      $transform={transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined}
    >
      <ImageWrapper $w={size} $aspectRatio={aspectRatio}>
        {_.isNil(value) ? (
          <BlankImagePlaceHolder $angle={angle} />
        ) : (
          <Image
            alt={MAIN_ATTR?.IMAGE_ALT}
            fill
            style={{ objectFit: resize, filter: filterImage }}
            src={value}
          />
        )}
      </ImageWrapper>
    </ContainerDraggable>
  );
};
