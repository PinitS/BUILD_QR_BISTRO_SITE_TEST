// import _ from "lodash";
// import React from "react";
// import { shallowEqual, useSelector } from "react-redux";
// import { RenderEditorTextFreeform } from "@components/LandingPage/PageBuilder/RenderEditor/Freeform/RenderEditorTextFreeform";
// import { RenderViewTextFreeform } from "./RenderViewTextFreeform";

// export const ContainerRenderViewFreeform = () => {
//   const freeformBlocks = [
//     {
//       id: "8a5dee74-f531-4277-93e1-a931812ab1cf",
//       type: "TEXT",
//       value: "",
//       color: "#17171B",
//       fontFamily: "IBMPlexSansThai",
//       fontWeight: 400,
//       attribute: {
//         DESKTOP: {
//           isVisible: true,
//           x: 170.8470916748047,
//           y: -0.8855514526367188,
//           fontSize: 30,
//         },
//         MOBILE: {
//           isVisible: true,
//           x: 142.109375,
//           y: -0.21634674072265625,
//           fontSize: 18,
//         },
//       },
//     },
//   ];

//   return (
//     <React.Fragment>
//       {_.map(freeformBlocks, (item) => {
//         const id = _.get(item, ["id"]);
//         const type = _.get(item, ["type"]);

//         switch (type) {
//           case "TEXT":
//             return <RenderViewTextFreeform key={id} $item={item} />;

//           default:
//             break;
//         }
//       })}
//     </React.Fragment>
//   );
// };

import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";
import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RenderViewTextFreeform } from "@components/LandingPage/PageBuilder/RenderView/Freeform/RenderViewTextFreeform";
import { RenderViewImageFreeform } from "@components/LandingPage/PageBuilder/RenderView/Freeform/RenderViewImageFreeform";

export const ContainerRenderViewFreeform = () => {
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);
  const { device } = useContainerDimensionContext();
  return (
    <React.Fragment>
      {_.chain(freeformBlocks)
        .get([device])
        .map((item) => {
          const id = _.get(item, ["id"]);
          const type = _.get(item, ["type"]);
          switch (type) {
            case "TEXT":
              return <RenderViewTextFreeform key={id} $item={item} />;
            case "IMAGE":
              return <RenderViewImageFreeform key={id} $item={item} />;
            default:
              return null;
          }
        })
        .value()}
    </React.Fragment>
  );
};
