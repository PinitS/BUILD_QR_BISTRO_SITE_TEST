import _ from "lodash";

export const getBoundingRectById = ({ id = null }) => {
  const element = document.getElementById(`${id}`);
  const result = element?.getBoundingClientRect();
  return {
    elWidth: _.round(result?.width) || 0,
    elHeight: _.round(result?.height) || 0,
    elLeft: _.round(result?.left) || 0,
    elTop: _.round(result?.top) || 0,
  };
};
