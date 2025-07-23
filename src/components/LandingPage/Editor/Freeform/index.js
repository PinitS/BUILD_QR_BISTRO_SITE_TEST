import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { EditorTextFreeform } from "@components/LandingPage/Editor/Freeform/EditorTextFreeform";

export const ContainerEditorFreeform = () => {
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);

  return (
    <React.Fragment>
      {_.map(freeformBlocks, (item) => {
        const id = _.get(item, ["id"]);
        const type = _.get(item, ["type"]);

        switch (type) {
          case "TEXT":
            return <EditorTextFreeform key={id} $item={item} />;

          default:
            break;
        }
      })}
    </React.Fragment>
  );
};
