import _ from "lodash";

export const isDarkHex = ({ hexColor }) => {
  if (!hexColor) {
    return false;
  }
  if (hexColor.toLowerCase() === "transparent") {
    return false;
  }
  const hex = _.chain(hexColor)
    .replace("#", "")
    .thru((str) =>
      str.length === 3
        ? _.chain(str)
            .split("")
            .map((c) => c + c)
            .join("")
            .value()
        : str,
    )
    .value();

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};
