import _ from "lodash";

export const resolveSubdomain = ({ ctx }) => {
  const result = _.chain(ctx)
    .get(["req", "headers", "host"])
    .split(":")
    .get(0)
    .split(".")
    .thru((item) => {
      return _.size(item) >= 2 ? _.get(item, 0) : null;
    })
    .value();

  return result;
};
