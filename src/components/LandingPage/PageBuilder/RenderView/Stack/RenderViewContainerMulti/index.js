import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import { setSelectedStackBlockColumnItem } from "@redux/reducers/selectedStackBlockColumnItem.reducers";
import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import { ContainerEmpty } from "../../ContainerItem/ContainerEmpty";
import { ContainerText } from "../../ContainerItem/ContainerText";
import { ContainerImage } from "../../ContainerItem/ContainerImage";
import { ContainerSlide } from "../../ContainerItem/ContainerSlide";
import { ContainerYoutube } from "../../ContainerItem/ContainerYoutube";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns = 1 }) => `repeat(${$columns}, 1fr)`};
  align-items: center;
  justify-content: center;
  gap: ${({ $spacing = 0 }) => $spacing}px;
  width: 100%;
  height: auto;
  padding-top: ${({ $paddingVertical = 0 }) => $paddingVertical}px;
  padding-bottom: ${({ $paddingVertical = 0 }) => $paddingVertical}px;

  padding-left: ${({ $paddingHorizontal = 0 }) => $paddingHorizontal}px;
  padding-right: ${({ $paddingHorizontal = 0 }) => $paddingHorizontal}px;

  flex-shrink: 0;
  overflow: hidden;
  box-sizing: border-box;
`;

const ContainerItem = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: ${({ $height = "auto" }) => (typeof $height === "number" ? `${$height}px` : $height)};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  overflow: hidden;
  box-sizing: border-box;
  border-radius: ${({ $radius }) => $radius}px;
`;

export const RenderViewContainerMulti = ({ $item }) => {
  const columns = _.get($item, ["columns"]);
  const columnItems = _.get($item, ["columnItems"]);
  const aspectRatio = _.get($item, ["aspectRatio"]);
  const height = _.get($item, ["height"]);
  const spacing = _.get($item, ["spacing"]);
  const paddingHorizontal = _.get($item, ["paddingHorizontal"]);
  const paddingVertical = _.get($item, ["paddingVertical"]);

  return (
    <Container
      $spacing={spacing}
      $columns={columns}
      $paddingHorizontal={paddingHorizontal}
      $paddingVertical={paddingVertical}
    >
      {_.chain(columnItems)
        .take(columns)
        .map((item, index) => {
          const id = _.get(item, ["id"]);
          const type = _.get(item, ["type"]);
          return (
            <ContainerItem
              key={index}
              $height={_.isNil(aspectRatio) ? height : "auto"}
              $aspectRatio={aspectRatio}
            >
              {(() => {
                switch (type) {
                  case "IMAGE":
                    return <ContainerImage key={id} $item={item} />;
                  case "TEXT":
                    return <ContainerText key={id} $item={item} />;
                  case "SLIDE":
                    return <ContainerSlide key={id} $item={item} />;
                  case "YOUTUBE":
                    return <ContainerYoutube key={id} $item={item} />;

                  default:
                    return <ContainerEmpty key={id} $item={item} />;
                }
              })()}
            </ContainerItem>
          );
        })
        .value()}
    </Container>
  );
};
