import _ from "lodash";

export const resolveColorWithOpacity = ({ color, opacity }) => {
  if (color === "transparent") return "transparent";
  const alpha = Math.round(Math.max(0, Math.min(100, opacity)) * 2.55);
  const alphaHex = alpha.toString(16).padStart(2, "0");
  return `${color}${alphaHex}`;
};
