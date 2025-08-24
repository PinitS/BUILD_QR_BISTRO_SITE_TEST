import _ from "lodash";
import React from "react";

import styled from "styled-components";
import { ContainerImage } from "../../ContainerItem/ContainerImage";
import { ContainerText } from "../../ContainerItem/ContainerText";
import { ContainerEmpty } from "../../ContainerItem/ContainerEmpty";
import { ContainerSlide } from "../../ContainerItem/ContainerSlide";
import { ContainerYoutube } from "../../ContainerItem/ContainerYoutube";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ $columnRatio = "50% 50%" }) => $columnRatio};
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
  height: ${({ $height = "auto" }) => $height}px;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: ${({ $radius }) => $radius}px;
`;

export const RenderViewContainerTwin = ({ $item }) => {
  const columnItems = _.get($item, ["columnItems"]);
  const columnRatio = _.chain($item)
    .get(["columnRatio"])
    .thru((arr) => {
      const total = _.sum(arr) || 1;
      return _.map(arr, (item) => `${item / total}fr`);
    })
    .join(" ")
    .value();

  const height = _.get($item, ["height"]);
  const spacing = _.get($item, ["spacing"]);
  const paddingHorizontal = _.get($item, ["paddingHorizontal"]);
  const paddingVertical = _.get($item, ["paddingVertical"]);

  // const resolveColumnRatio = _

  return (
    <Container
      $spacing={spacing}
      $columns={2}
      $columnRatio={columnRatio}
      $paddingHorizontal={paddingHorizontal}
      $paddingVertical={paddingVertical}
    >
      {_.chain(columnItems)
        .map((item, index) => {
          const id = _.get(item, ["id"]);
          const type = _.get(item, ["type"]);
          return (
            <ContainerItem key={index} $height={height}>
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
