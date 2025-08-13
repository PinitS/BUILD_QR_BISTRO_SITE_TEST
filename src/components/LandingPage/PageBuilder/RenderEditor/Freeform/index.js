import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RenderEditorTextFreeform } from "@components/LandingPage/PageBuilder/RenderEditor/Freeform/RenderEditorTextFreeform";
import { RenderEditorImageFreeform } from "@components/LandingPage/PageBuilder/RenderEditor/Freeform/RenderEditorImageFreeform";

export const ContainerRenderEditorFreeform = () => {
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  return (
    <React.Fragment>
      {_.chain(freeformBlocks)
        .get([selectedLayoutDesign])
        .map((item) => {
          const id = _.get(item, ["id"]);
          const type = _.get(item, ["type"]);
          switch (type) {
            case "TEXT":
              return <RenderEditorTextFreeform key={id} $item={item} />;
            case "IMAGE":
              return <RenderEditorImageFreeform key={id} $item={item} />;
            default:
              return null;
          }
        })
        .value()}
    </React.Fragment>
  );
};
