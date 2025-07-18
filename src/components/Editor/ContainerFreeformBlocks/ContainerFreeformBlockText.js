import { Text } from "@components/Base/Text";
import _ from "lodash";
import React from "react";
import { EDITOR_DEFAULT_STYLE } from "statics/DEFAULT_STYLE";

export const ContainerFreeformBlockText = ({ $item }) => {
  const value = _.get($item, ["value"]);
  return (
    <React.Fragment>
      {_.isNil(value) ? (
        <Text $fontSize={12} $color={EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.SELECT_TEXT_COLOR}>
          {EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.DEFAULT_TEXT}
        </Text>
      ) : (
        <Text>{value}</Text>
      )}{" "}
    </React.Fragment>
  );
};
