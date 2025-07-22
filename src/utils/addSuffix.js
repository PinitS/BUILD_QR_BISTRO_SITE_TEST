import _ from "lodash";

export const addSuffix = (value) => {
  return _.isNumber(value) ? `${value}px` : value;
};
