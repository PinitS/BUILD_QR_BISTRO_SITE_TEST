import { Select } from "@components/LandingPage/Base/Select";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { COLUMN_ITEM_TYPE } from "statics/PAGE_BUILDER_COLUMN_ITEM";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import { CustomizeEmpty } from "./CustomizeEmpty";
import { CustomizeText } from "./CustomizeText";
import { CustomizeImage } from "./CustomizeImage";
import { CustomizeSlide } from "./CustomizeSlide";
import { CustomizeYoutube } from "./CustomizeYoutube";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${MAIN_SIZE?.SPACING}px;
`;

export const CustomizeColumnItem = () => {
  const dispatch = useDispatch();
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const selectedStackBlockColumnItem = useSelector(
    (state) => state?.selectedStackBlockColumnItem?.data,
    shallowEqual,
  );

  const activeStackBlockIndex = _.chain(stackBlocks)
    .get([selectedLayoutDesign])
    .findIndex((item) => {
      return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
    })
    .value();

  const selectStackBlock = _.chain(stackBlocks).get([selectedLayoutDesign, activeStackBlockIndex]).value();

  const activeColumnIndex = _.chain(selectStackBlock)
    .get(["columnItems"])
    .findIndex((item) => {
      return _.get(item, ["id"]) === selectedStackBlockColumnItem;
    })
    .value();

  const selectItem = _.chain(stackBlocks)
    .get([selectedLayoutDesign, activeStackBlockIndex, "columnItems", activeColumnIndex])
    .value();

  return (
    <Container>
      {(() => {
        switch (selectItem?.type) {
          case "IMAGE":
            return (
              <CustomizeImage
                $selectItem={selectItem}
                $activeColumnIndex={activeColumnIndex}
                $activeStackBlockIndex={activeStackBlockIndex}
              />
            );
          case "TEXT":
            return (
              <CustomizeText
                $selectItem={selectItem}
                $activeColumnIndex={activeColumnIndex}
                $activeStackBlockIndex={activeStackBlockIndex}
              />
            );
          case "SLIDE":
            return (
              <CustomizeSlide
                $selectItem={selectItem}
                $activeColumnIndex={activeColumnIndex}
                $activeStackBlockIndex={activeStackBlockIndex}
              />
            );

          case "YOUTUBE":
            return (
              <CustomizeYoutube
                $selectItem={selectItem}
                $activeColumnIndex={activeColumnIndex}
                $activeStackBlockIndex={activeStackBlockIndex}
              />
            );

          default:
            return (
              <CustomizeEmpty
                $selectItem={selectItem}
                $activeColumnIndex={activeColumnIndex}
                $activeStackBlockIndex={activeStackBlockIndex}
              />
            );
        }
      })()}
    </Container>
  );
};
