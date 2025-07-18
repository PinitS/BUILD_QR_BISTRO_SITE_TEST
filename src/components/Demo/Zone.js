import _ from "lodash";
import React from "react";
import { MOCKUP_ZONE } from "statics/DEMO_ZONE";

const DESIGN_WIDTH = 325; // เปลี่ยนชื่อเป็นชื่ออื่น

export const Zone = () => {
  return (
    <div style={{ width: 280 }}>
      <div
        style={{
          background: "white",
          position: "relative",
          width: "100%",
          backgroundSize: "contain",
          aspectRatio: "16 / 9",
          backgroundImage: `url('https://d191sdiqrxs6vs.cloudfront.net/e30636f4-5f2c-462d-8cf7-68957fa5df3b/zone-layout/a0c1c79a-2dbb-4d31-aaf6-3df114401f67/649171bd-f390-4ce3-a9b3-7d21c1e68890.webp')`,
        }}
      >
        {_.map(MOCKUP_ZONE, (item) => {
          const x = _.get(item, ["x"]);
          const y = _.get(item, ["y"]);
          const size = _.get(item, ["size"]);
          const id = _.get(item, ["id"]);
          const markerColor = _.get(item, ["markerColor"]);

          const sizePercent = (size / DESIGN_WIDTH) * 100;

          return (
            <div
              key={id}
              style={{
                position: "absolute",
                backgroundColor: markerColor,
                top: `${y}%`,
                left: `${x}%`,
                transform: "translate(-50%, -50%)",
                width: `${sizePercent}%`,
                aspectRatio: 1,
                opacity: 0.7,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
