import _ from "lodash";

export const resolveItemAttribute = ({ item, device }) => {
  switch (device) {
    case "DESKTOP":
      return _.get(item, ["attribute", "DESKTOP"]);
    case "TABLET":
      return _.get(item, ["attribute", "MOBILE"]);
    case "MOBILE":
      return _.get(item, ["attribute", "MOBILE"]);
    default:
      return _.get(item, ["attribute", "DESKTOP"]);
  }
};
