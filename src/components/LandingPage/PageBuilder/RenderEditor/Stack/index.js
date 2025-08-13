import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RenderEditorVoidStack } from "./RenderEditorVoidStack";

export const ContainerRenderEditorStack = () => {
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  return (
    <React.Fragment>
      {_.chain(stackBlocks)
        .get([selectedLayoutDesign])
        .map((item) => {
          const id = _.get(item, ["id"]);
          const type = _.get(item, ["type"]);
          switch (type) {
            case "VOID":
              return <RenderEditorVoidStack key={id} $item={item} />;
            default:
              return null;
          }
        })
        .value()}
    </React.Fragment>
  );
};
