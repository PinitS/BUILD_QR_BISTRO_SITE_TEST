import _ from "lodash";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import Image from "next/image";
import { MAIN_ATTR } from "statics/PAGE_BUILDER_ATTRIBUTE";
import { resolveImageFilter } from "@utils/resolve/resolveImageFilter";
import { PlaceHolderImage } from "@components/LandingPage/Base/Image/PlaceHolderImage";
import { resolveScaleSize } from "@utils/resolve/resolveScaleSize";
import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";

const ContainerDraggable = styled.div`
  position: absolute;
  user-select: none;
  touch-action: none;

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

  overflow: hidden;
  z-index: 2;
  box-sizing: border-box;
`;

export const RenderViewImageFreeform = ({ $item }) => {
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const { scale } = useContainerDimensionContext();
  const value = _.get($item, ["value"]);
  const aspectRatio = _.get($item, ["aspectRatio"]);
  const resize = _.get($item, ["resize"], "contain");
  const backgroundColor = _.get($item, ["backgroundColor"]);
  const filterType = _.get($item, ["filterType"]);
  const filterValue = _.get($item, ["filterValue"]);

  const filterImage = resolveImageFilter({ filterType, filterValue });

  const radius = _.get($item, ["radius"]);

  const x = resolveScaleSize({ size: _.get($item, ["x"]), scale });

  const y = _.get($item, ["y"]);
  const size = resolveScaleSize({ size: _.get($item, ["size"]), scale });

  return (
    <ContainerDraggable
      $x={x}
      $y={y}
      $w={size}
      $aspectRatio={aspectRatio}
      $backgroundColor={backgroundColor}
      $radius={(radius / 100) * size}
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
