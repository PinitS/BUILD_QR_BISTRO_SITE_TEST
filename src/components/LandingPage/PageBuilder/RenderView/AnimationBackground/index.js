import { GradientFlow } from "@components/LandingPage/Base/AnimationBackground/GradientFlow";
import { Starfield } from "@components/LandingPage/Base/AnimationBackground/Starfield";
import _ from "lodash";
import React from "react";

export const AnimationBackground = ({ $customizeBackground = null }) => {
  const bodyType = _.get($customizeBackground, ["bodyType"]);
  const type = _.get($customizeBackground, ["bodyAnimationType"]);

  const bodyAnimationGradientFlowPrimary = _.get($customizeBackground, ["bodyAnimationGradientFlowPrimary"]);
  const bodyAnimationGradientFlowSecondary = _.get($customizeBackground, [
    "bodyAnimationGradientFlowSecondary",
  ]);

  if (bodyType === "ANIMATION") {
    switch (type) {
      case "STAR_FIELD":
        return <Starfield />;
      case "GRADIENT_FLOW":
        return (
          <GradientFlow $color={[bodyAnimationGradientFlowSecondary, bodyAnimationGradientFlowPrimary]} />
        );
      default:
        return null;
    }
  }

  return null;
};
