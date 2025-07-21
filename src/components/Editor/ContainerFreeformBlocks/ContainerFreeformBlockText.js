import { Text } from "@components/Base/Text";
import { fitPxW } from "@utils/resolve/resolveSize";
import _ from "lodash";
import React from "react";
import { EDITOR_DEFAULT_STYLE } from "statics/DEFAULT_STYLE";

export const ContainerFreeformBlockText = ({ $item, $containerWidth }) => {
  const scale = fitPxW({ containerWidth: $containerWidth });
  const value = _.get($item, ["attribute", "value"]);
  const size = _.get($item, ["attribute", "size"]);
  const mv = _.get($item, ["attribute", "mv"]);
  const mh = _.get($item, ["attribute", "mh"]);

  return (
    <React.Fragment>
      {_.isNil(value) ? (
        <Text
          $mt={mv}
          $mb={mv}
          $ml={mh}
          $mr={mh}
          $fontSize={size * scale}
          $color={EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.SELECT_TEXT_COLOR}
        >
          {EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.DEFAULT_TEXT}
        </Text>
      ) : (
        <Text>{value}</Text>
      )}{" "}
    </React.Fragment>
  );
};
