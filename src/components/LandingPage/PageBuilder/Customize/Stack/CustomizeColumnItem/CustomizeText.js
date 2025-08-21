import { ColorPicker } from "@components/LandingPage/Base/ColorPicker";
import { Select } from "@components/LandingPage/Base/Select";
import { Slide } from "@components/LandingPage/Base/Slide";
import { TextArea } from "@components/LandingPage/Base/TextArea";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { COLUMN_ITEM_TYPE, PADDING_RANGE } from "statics/PAGE_BUILDER_COLUMN_ITEM";
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

export const CustomizeText = ({ $selectItem, $activeColumnIndex, $activeStackBlockIndex }) => {
  const dispatch = useDispatch();
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  const {
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: _.get($selectItem, ["type"]),
      textValue: _.get($selectItem, ["textValue"], ""),
      color: _.get($selectItem, ["color"], "#000000"),
      fontSize: String(_.get($selectItem, ["fontSize"], 16)),
      fontWeight: String(_.get($selectItem, ["fontWeight"], 400)),
      fontFamily: _.get($selectItem, ["fontFamily"], "IBMPlexSansThai"),
      textAlign: _.get($selectItem, ["textAlign"], "left"),

      justifyContent: _.get($selectItem, ["justifyContent"], "flex-start"),
      alignItems: _.get($selectItem, ["alignItems"], "flex-start"),

      backgroundColor: _.get($selectItem, ["backgroundColor"]),
      borderTopLeftRadius: _.get($selectItem, ["borderTopLeftRadius"], 0),
      borderTopRightRadius: _.get($selectItem, ["borderTopRightRadius"], 0),
      borderBottomLeftRadius: _.get($selectItem, ["borderBottomLeftRadius"], 0),
      borderBottomRightRadius: _.get($selectItem, ["borderBottomRightRadius"], 0),

      paddingHorizontal: _.get($selectItem, ["paddingHorizontal"], 0),
      paddingTop: _.get($selectItem, ["paddingTop"], 0),
    },
  });
  const type = watch("type");

  // for text
  const textValue = watch("textValue");
  const color = watch("color");
  const fontSize = watch("fontSize");
  const fontWeight = watch("fontWeight");
  const fontFamily = watch("fontFamily");
  const textAlign = watch("textAlign");
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
  const paddingHorizontal = watch("paddingHorizontal");
  const paddingTop = watch("paddingTop");

  useEffect(() => {
    if ($activeStackBlockIndex === -1 && $activeColumnIndex === -1) {
      return;
    }

    const updateStackColumnItem = {
      ...$selectItem,
      id: $selectItem?.id,
      type,
      textValue,
      color,
      fontSize: Number(fontSize),
      fontWeight: Number(fontWeight),
      fontFamily,
      fontWeight,
      textAlign,
      justifyContent,
      alignItems,
      backgroundColor,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      paddingHorizontal,
      paddingTop,
    };

    if (_.isEqual(updateStackColumnItem, $selectItem)) {
      return;
    }

    const updateStackBlocks = _.chain(stackBlocks)
      .cloneDeep()
      .set(
        [selectedLayoutDesign, $activeStackBlockIndex, "columnItems", $activeColumnIndex],
        updateStackColumnItem,
      )
      .value();
    dispatch(setStackBlocks(updateStackBlocks));
  }, [
    type,
    textValue,
    color,
    fontSize,
    fontFamily,
    fontWeight,
    textAlign,
    justifyContent,
    alignItems,
    backgroundColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    paddingHorizontal,
    paddingTop,
  ]);

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
      <Line />

      <TextArea
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $control={control}
        $name="textValue"
        $label="text"
      />
      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={FONT_SIZE_OPTIONS}
        $control={control}
        $name="fontSize"
        $label={`font Size (${selectedLayoutDesign})`}
      />
      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={FONT_FAMILY_OPTIONS}
        $control={control}
        $name="fontFamily"
        $label="font family"
      />

      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={_.get(FONT_WEIGHT_OPTIONS, [fontFamily])}
        $control={control}
        $name="fontWeight"
        $label="font Weight"
      />

      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={ALIGNMENT_OPTIONS}
        $control={control}
        $name="textAlign"
        $label="font align"
      />
      <ColorPicker
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $control={control}
        $fontFamily="Sen"
        $name="color"
        $label={`Font Color`}
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
        $label="Padding (Horizontal)"
        $fontFamily="Sen"
        $name="paddingHorizontal"
        $min={PADDING_RANGE.MIN}
        $max={PADDING_RANGE.MAX}
        $valueIndicator={paddingHorizontal}
        $control={control}
      />

      <Slide
        $label="Padding (Top)"
        $fontFamily="Sen"
        $name="paddingTop"
        $min={PADDING_RANGE.MIN}
        $max={PADDING_RANGE.MAX}
        $valueIndicator={paddingTop}
        $control={control}
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
