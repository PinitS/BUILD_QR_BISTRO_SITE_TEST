/* eslint-disable react-hooks/exhaustive-deps */
import { ColorPicker } from "@components/LandingPage/Base/ColorPicker";
import { Slide } from "@components/LandingPage/Base/Slide";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import { COLUMN_ITEM_RADIUS_LIMIT } from "statics/PAGE_BUILDER_VOID";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${MAIN_SIZE?.SPACING}px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${MAIN_COLORS?.MAIN?.LINE};
`;

export const CustomizeEmpty = () => {
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      backgroundColor: _.get(selectItem, ["backgroundColor"]),
      borderTopLeftRadius: _.get(selectItem, ["borderTopLeftRadius"], 0),
      borderTopRightRadius: _.get(selectItem, ["borderTopRightRadius"], 0),
      borderBottomLeftRadius: _.get(selectItem, ["borderBottomLeftRadius"], 0),
      borderBottomRightRadius: _.get(selectItem, ["borderBottomRightRadius"], 0),
    },
  });

  const backgroundColor = watch("backgroundColor");
  const borderTopLeftRadius = watch("borderTopLeftRadius");
  const borderTopRightRadius = watch("borderTopRightRadius");
  const borderBottomLeftRadius = watch("borderBottomLeftRadius");
  const borderBottomRightRadius = watch("borderBottomRightRadius");

  useEffect(() => {
    if (activeStackBlockIndex === -1 && activeColumnIndex === -1) {
      return;
    }

    const updateStackColumnItem = {
      ...selectItem,
      backgroundColor,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
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
  }, [
    backgroundColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  ]);

  useEffect(() => {
    reset({
      backgroundColor: _.get(selectItem, ["backgroundColor"]),
      borderTopLeftRadius: _.get(selectItem, ["borderTopLeftRadius"], 0),
      borderTopRightRadius: _.get(selectItem, ["borderTopRightRadius"], 0),
      borderBottomLeftRadius: _.get(selectItem, ["borderBottomLeftRadius"], 0),
      borderBottomRightRadius: _.get(selectItem, ["borderBottomRightRadius"], 0),
    });
  }, [selectedStackBlockColumnItem]);

  return (
    <Container>
      <ColorPicker
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $control={control}
        $fontFamily="Sen"
        $name="backgroundColor"
        $label={`background color`}
      />
      <Line />
      <Slide
        $label="Radius (Top Left)"
        $fontFamily="Sen"
        $name="borderTopLeftRadius"
        $min={COLUMN_ITEM_RADIUS_LIMIT?.min}
        $max={COLUMN_ITEM_RADIUS_LIMIT?.max}
        $valueIndicator={borderTopLeftRadius}
        $control={control}
      />
      <Slide
        $label="Radius (Top Right)"
        $fontFamily="Sen"
        $name="borderTopRightRadius"
        $min={COLUMN_ITEM_RADIUS_LIMIT?.min}
        $max={COLUMN_ITEM_RADIUS_LIMIT?.max}
        $valueIndicator={borderTopRightRadius}
        $control={control}
      />
      <Slide
        $label="Radius (Bottom Left)"
        $fontFamily="Sen"
        $name="borderBottomLeftRadius"
        $min={COLUMN_ITEM_RADIUS_LIMIT?.min}
        $max={COLUMN_ITEM_RADIUS_LIMIT?.max}
        $valueIndicator={borderBottomLeftRadius}
        $control={control}
      />
      <Slide
        $label="Radius (Bottom Right)"
        $fontFamily="Sen"
        $name="borderBottomRightRadius"
        $min={COLUMN_ITEM_RADIUS_LIMIT?.min}
        $max={COLUMN_ITEM_RADIUS_LIMIT?.max}
        $valueIndicator={borderBottomRightRadius}
        $control={control}
      />
    </Container>
  );
};
