import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RenderEditorVoidStack } from "./RenderEditorVoidStack";

export const ContainerRenderEditorStack = () => {
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);
  return (
    <React.Fragment>
      {_.map(stackBlocks, (item) => {
        const id = _.get(item, ["id"]);
        const type = _.get(item, ["type"]);

        switch (type) {
          case "VOID":
            return <RenderEditorVoidStack key={id} $item={item} />;
          // case "IMAGE":
          //   return <RenderEditorImageFreeform key={id} $item={item} />;
          default:
            return null;
        }
      })}
    </React.Fragment>
  );
};
