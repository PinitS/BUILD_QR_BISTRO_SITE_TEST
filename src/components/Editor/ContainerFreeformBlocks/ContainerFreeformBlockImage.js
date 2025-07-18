import { Text } from "@components/Base/Text";
import _ from "lodash";
import Image from "next/image";
import React from "react";
import { EDITOR_DEFAULT_STYLE } from "statics/DEFAULT_STYLE";

export const ContainerFreeformBlockImage = ({ $item }) => {
  const value = _.get($item, ["value"]);
  return (
    <React.Fragment>
      {!_.isNil(value) ? (
        <Text $fontSize={12} $color={EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.SELECT_TEXT_COLOR}>
          {EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.DEFAULT_TEXT}
        </Text>
      ) : (
        <Image
          src="https://d191sdiqrxs6vs.cloudfront.net/e30636f4-5f2c-462d-8cf7-68957fa5df3b/zone-layout/a0c1c79a-2dbb-4d31-aaf6-3df114401f67/649171bd-f390-4ce3-a9b3-7d21c1e68890.webp"
          alt="image"
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
      )}
    </React.Fragment>
  );
};
