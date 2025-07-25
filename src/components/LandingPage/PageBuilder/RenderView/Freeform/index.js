import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RenderEditorTextFreeform } from "@components/LandingPage/PageBuilder/RenderEditor/Freeform/RenderEditorTextFreeform";
import { RenderViewTextFreeform } from "./RenderViewTextFreeform";

export const ContainerRenderViewFreeform = () => {
  const freeformBlocks = [
    {
      id: "b8c7ebdf-8418-4cf3-a760-ef87872b2f22",
      type: "TEXT",
      value: "",
      color: "#17171B",
      fontFamily: "IBMPlexSansThai",
      fontWeight: 400,
      attribute: {
        DESKTOP: {
          isVisible: true,
          x: 84.1484375,
          y: -0.40234375,
          fontSize: 48,
        },
        MOBILE: {
          isVisible: true,
          x: 106.921875,
          y: -0.9609375,
          fontSize: 16,
        },
      },
    },
  ];

  return (
    <React.Fragment>
      {_.map(freeformBlocks, (item) => {
        const id = _.get(item, ["id"]);
        const type = _.get(item, ["type"]);

        switch (type) {
          case "TEXT":
            return <RenderViewTextFreeform key={id} $item={item} />;

          default:
            break;
        }
      })}
    </React.Fragment>
  );
};
