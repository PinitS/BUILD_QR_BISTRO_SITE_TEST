import { ColorPicker } from "@components/LandingPage/Base/ColorPicker";
import { Select } from "@components/LandingPage/Base/Select";
import { Slide } from "@components/LandingPage/Base/Slide";
import { TextArea } from "@components/LandingPage/Base/TextArea";
import { UploadFile } from "@components/LandingPage/Base/UploadFile";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { FILTER_OPTIONS, FILTER_OPTIONS_RANGE, RESIZE_OPTIONS } from "statics/PAGE_BUILDER_IMAGE_CUSTOMIZE";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import {
  ALIGNMENT_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
} from "statics/PAGE_BUILDER_TEXT_CUSTOMIZE";
import { ALIGN_CONTENT_OPTIONS, COLUMN_ITEM_RADIUS_LIMIT } from "statics/PAGE_BUILDER_VOID";
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

export const CustomizeImage = () => {
  const dispatch = useDispatch();
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data);
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
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      value: _.get(selectItem, ["value"]),
      resize: String(_.get(selectItem, ["resize"], "contain")),
      filterType: _.get(selectItem, ["filterType"], "NONE"),
      filterValue: _.get(selectItem, ["filterValue"], null),

      justifyContent: _.get(selectItem, ["justifyContent"], "flex-start"),
      alignItems: _.get(selectItem, ["alignItems"], "flex-start"),

      backgroundColor: _.get(selectItem, ["backgroundColor"]),
      borderTopLeftRadius: _.get(selectItem, ["borderTopLeftRadius"], 0),
      borderTopRightRadius: _.get(selectItem, ["borderTopRightRadius"], 0),
      borderBottomLeftRadius: _.get(selectItem, ["borderBottomLeftRadius"], 0),
      borderBottomRightRadius: _.get(selectItem, ["borderBottomRightRadius"], 0),
    },
  });
  // for text
  const value = watch("value");
  const resize = watch("resize");
  const filterType = watch("filterType");
  const filterValue = watch("filterValue");
  // for text

  // align
  const justifyContent = watch("justifyContent");
  const alignItems = watch("alignItems");
  // align
  const backgroundColor = watch("backgroundColor");
  const borderTopLeftRadius = watch("borderTopLeftRadius");
  const borderTopRightRadius = watch("borderTopRightRadius");
  const borderBottomLeftRadius = watch("borderBottomLeftRadius");
  const borderBottomRightRadius = watch("borderBottomRightRadius");

  useEffect(() => {
    if (activeStackBlockIndex === -1 && activeColumnIndex === -1) {
      return;
    }

    let updateFilterValue = null;
    if (filterType !== _.get(selectItem, ["filterType"])) {
      updateFilterValue = _.get(FILTER_OPTIONS_RANGE, [filterType, "default"]);
      setValue("filterValue", updateFilterValue);
    } else {
      updateFilterValue = filterValue;
    }
    const updateStackColumnItem = {
      ...selectItem,
      value,
      resize,
      filterType,
      filterValue: Number(filterValue),
      justifyContent,
      alignItems,
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
    dispatch(setStackBlocks(updateStackBlocks));
  }, [
    value,
    resize,
    filterType,
    filterValue,
    justifyContent,
    alignItems,
    backgroundColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  ]);

  const attributeFilterValue = _.get(FILTER_OPTIONS_RANGE, [filterType]);

  return (
    <Container>
      <UploadFile
        $setValue={setValue}
        $value={value}
        // $aspectRatio={aspectRatio}
        $backgroundColor={backgroundColor}
      />

      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={RESIZE_OPTIONS}
        $control={control}
        $name="resize"
        $label="resize"
      />

      <Select
        $disabled={_.isNil(value)}
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={FILTER_OPTIONS}
        $control={control}
        $name="filterType"
        $label="filter"
      />

      <Slide
        $disabled={filterType === "NONE"}
        $label="Filter value"
        $fontFamily="Sen"
        $name="filterValue"
        $min={attributeFilterValue?.min}
        $max={attributeFilterValue?.max}
        $isShowValue={filterType !== "NONE"}
        $valueIndicator={((filterValue / attributeFilterValue?.max) * 100).toFixed(0)}
        $control={control}
      />

      <Line />

      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={ALIGN_CONTENT_OPTIONS}
        $control={control}
        $name="justifyContent"
        $label="horizontal Align"
      />

      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={ALIGN_CONTENT_OPTIONS}
        $control={control}
        $name="alignItems"
        $label="vertical Align"
      />

      <Line />

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
