import { PlaceHolderImage } from "@components/LandingPage/Base/Image/PlaceHolderImage";
import { resolveImageFilter } from "@utils/resolve/resolveImageFilter";
import _ from "lodash";
import Image from "next/image";
import React, { useRef } from "react";
import { MAIN_ATTR } from "statics/PAGE_BUILDER_ATTRIBUTE";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
  border-top-right-radius: ${({ $borderTopRightRadius = 0 }) => $borderTopRightRadius}px;
  border-top-left-radius: ${({ $borderTopLeftRadius = 0 }) => $borderTopLeftRadius}px;
  border-bottom-right-radius: ${({ $borderBottomRightRadius = 0 }) => $borderBottomRightRadius}px;
  border-bottom-left-radius: ${({ $borderBottomLeftRadius = 0 }) => $borderBottomLeftRadius}px;
  border-width: ${({ $isActive = false }) => ($isActive ? 1 : 0)}px;
  border-style: dashed;
  border-color: ${({ $isActive = false }) => ($isActive ? MAIN_COLORS?.MAIN?.BLOCK_ACTIVE : "transparent")};
  overflow: hidden;
`;

const ContainerBlankImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerImage = ({ $item = null, $isActive = false }) => {
  // image only

  // const id = _.get($item, ["id"]);
  const imageValue = _.get($item, ["imageValue"]);
  const resize = _.get($item, ["resize"], "contain");

  const filterType = _.get($item, ["filterType"]);
  const filterValue = _.get($item, ["filterValue"]);

  const filterImage = resolveImageFilter({ filterType, filterValue });

  const backgroundColor = _.get($item, ["backgroundColor"]);

  const borderTopLeftRadius = _.get($item, ["borderTopLeftRadius"]);
  const borderTopRightRadius = _.get($item, ["borderTopRightRadius"]);
  const borderBottomLeftRadius = _.get($item, ["borderBottomLeftRadius"]);
  const borderBottomRightRadius = _.get($item, ["borderBottomRightRadius"]);

  return (
    <Container
      $backgroundColor={backgroundColor}
      $borderTopLeftRadius={borderTopLeftRadius}
      $borderTopRightRadius={borderTopRightRadius}
      $borderBottomLeftRadius={borderBottomLeftRadius}
      $borderBottomRightRadius={borderBottomRightRadius}
      $isActive={$isActive}
    >
      {_.isNil(imageValue) ? (
        <PlaceHolderImage />
      ) : (
        <Image
          alt={MAIN_ATTR?.IMAGE_ALT}
          fill
          style={{
            objectFit: resize,
            filter: filterImage,
            borderRadius: "inherit",
          }}
          src={imageValue}
        />
      )}
    </Container>
  );
};
