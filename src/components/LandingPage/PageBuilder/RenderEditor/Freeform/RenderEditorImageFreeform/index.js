import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useDraggable } from "@dnd-kit/core";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import { Text } from "@components/LandingPage/Base/Text";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import Image from "next/image";
import { MAIN_ATTR } from "statics/PAGE_BUILDER_ATTRIBUTE";
import { getAngleFromAspectRatio } from "@utils/getAngleFromAspectRatio";

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

const ImageWrapper = styled.div`
  position: relative;
  width: ${({ $w }) => `${$w}px`};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
`;

const UploadBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #a6a6a6;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 1px;
    background-color: #c5c5c5;
    transform-origin: center;
  }

  &::before {
    transform: ${({ $angle }) => `translate(-50%, -50%) rotate(${$angle}deg)`};
  }

  &::after {
    transform: ${({ $angle }) => `translate(-50%, -50%) rotate(-${$angle}deg)`};
  }
`;

const ANGLE_BY_ASPECT_RATIO = {
  "1/1": 45,
  "4/3": 36.87,
  "16/9": 29.36,
  "2/1": 26.57,
  "3/4": 53.13,
  "9/16": 60.64,
};

export const RenderEditorImageFreeform = ({ $item }) => {
  const dispatch = useDispatch();
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const importBlockAttr = useSelector((state) => state?.importBlockAttr?.data, shallowEqual);

  const id = _.get($item, ["id"]);
  const value = _.get($item, ["value"]);
  const aspectRatio = _.get($item, ["aspectRatio"]);
  const resize = _.get($item, ["resize"], "contain");

  console.log("aspectRatio :>> ", aspectRatio);

  const attribute = _.get($item, ["attribute", selectedLayoutDesign]);
  const x = _.get(attribute, ["x"]);
  const y = _.get(attribute, ["y"]);
  const w = _.get(attribute, ["w"]);

  const angle = getAngleFromAspectRatio(aspectRatio);

  // const h = aspectRatio && w ? w / aspectRatio : "auto";
  // console.log("h :>> ", h);

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
      onClick={() => handleSelectBlock()}
      ref={(el) => {
        setNodeRef(el);
      }}
      {...listeners}
      {...attributes}
      $isActive={isActive}
      $x={x}
      $y={y}
      $w={w}
      $transform={transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined}
    >
      <ImageWrapper $w={w} $aspectRatio={aspectRatio}>
        <UploadBox $angle={angle}>
          <Text
            $fontFamily="Sen"
            $textTransform="capitalize"
            $color={"#c5c5c5"}
            $fontSize={14}
            $fontWeight={500}
            $align="start"
          >
            Blank Image
          </Text>
        </UploadBox>
        {/* <Image
          alt={MAIN_ATTR?.IMAGE_ALT}
          fill
          style={{ objectFit: resize }}
          src={
            "https://d191sdiqrxs6vs.cloudfront.net/e30636f4-5f2c-462d-8cf7-68957fa5df3b/zone-layout/a0c1c79a-2dbb-4d31-aaf6-3df114401f67/649171bd-f390-4ce3-a9b3-7d21c1e68890.webp"
          }
        /> */}
      </ImageWrapper>
    </ContainerDraggable>
  );
};
