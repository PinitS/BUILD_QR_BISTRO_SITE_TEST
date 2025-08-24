import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RenderViewContainerMulti } from "./RenderViewContainerMulti";
import { RenderViewContainerTwin } from "./RenderViewContainerTwin";
import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";

export const ContainerRenderViewStack = () => {
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);
  const { device } = useContainerDimensionContext();

  return (
    <React.Fragment>
      {_.chain(stackBlocks)
        .get([device])
        .map((item) => {
          const id = _.get(item, ["id"]);
          const type = _.get(item, ["type"]);
          switch (type) {
            case "MULTI":
              return <RenderViewContainerMulti key={id} $item={item} />;
            case "TWIN":
              return <RenderViewContainerTwin key={id} $item={item} />;
            default:
              return null;
          }
        })
        .value()}
    </React.Fragment>
  );
};
