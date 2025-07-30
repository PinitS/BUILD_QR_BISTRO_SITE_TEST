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
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  width: ${({ width = 100 }) => width}%;
  height: ${({ height = 200 }) => height}px;
  background: green;
`;

export const RenderEditorVoidStack = ({ $item }) => {
  const dispatch = useDispatch();

  const id = _.get($item, ["id"]);

  //   const filterImage = resolveImageFilter({ filterType, filterValue });

  //   const radius = _.get($item, ["radius"]);

  //   const attribute = _.get($item, ["attribute", selectedLayoutDesign]);
  //   const x = _.get(attribute, ["x"]);
  //   const y = _.get(attribute, ["y"]);
  //   const size = _.get(attribute, ["size"]);

  //   const angle = getAngleFromAspectRatio(aspectRatio);

  //   const isActive = _.get(customizeBlockAttr, ["id"]) === id && _.get(customizeBlockAttr, ["isVisible"]);

  return <ContainerDraggable id={id}></ContainerDraggable>;
};
