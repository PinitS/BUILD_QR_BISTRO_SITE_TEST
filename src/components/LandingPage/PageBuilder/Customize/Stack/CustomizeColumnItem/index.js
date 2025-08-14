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

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: _.get(selectItem, ["type"]),
    },
  });

  const type = watch("type");

  useEffect(() => {
    if (activeStackBlockIndex === -1 && activeColumnIndex === -1) {
      return;
    }

    const updateStackColumnItem = {
      ...selectItem,
      type,
    };

    if (_.isEqual(updateStackColumnItem, selectItem)) {
      return;
    }

    const updateStackBlocks = _.chain(stackBlocks)
      .cloneDeep()
      .set(
        [selectedLayoutDesign, activeStackBlockIndex, "columnItems", activeColumnIndex],
        updateStackColumnItem,
      )
      .value();

    batch(() => {
      dispatch(setStackBlocks(updateStackBlocks));
    });
  }, [type, selectItem]);

  return (
    <Container>
      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={COLUMN_ITEM_TYPE}
        $control={control}
        $name="type"
        $label="type"
      />

      {(() => {
        switch (type) {
          case "IMAGE":
            return <CustomizeImage />;
          case "TEXT":
            return <CustomizeText />;
          case "SLIDE":
            return <div>{"slide"}</div>;

          default:
            return <CustomizeEmpty />;
        }
      })()}
    </Container>
  );
};
