import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RenderEditorTextFreeform } from "@components/LandingPage/PageBuilder/RenderEditor/Freeform/RenderEditorTextFreeform";

export const ContainerRenderEditorFreeform = () => {
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);

  return (
    <React.Fragment>
      {_.map(freeformBlocks, (item) => {
        const id = _.get(item, ["id"]);
        const type = _.get(item, ["type"]);

        switch (type) {
          case "TEXT":
            return <RenderEditorTextFreeform key={id} $item={item} />;

          default:
            break;
        }
      })}
    </React.Fragment>
  );
};
