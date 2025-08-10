/* eslint-disable react-hooks/exhaustive-deps */
import { ColorPicker } from "@components/LandingPage/Base/ColorPicker";
import { Select } from "@components/LandingPage/Base/Select";
import { Slide } from "@components/LandingPage/Base/Slide";
import { TextArea } from "@components/LandingPage/Base/TextArea";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
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

export const CustomizeText = () => {
  const dispatch = useDispatch();
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const selectedStackBlockColumnItem = useSelector(
    (state) => state?.selectedStackBlockColumnItem?.data,
    shallowEqual,
  );

  const selectItem = _.chain(stackBlocks)
    .find((item) => {
      return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
    })
    .value();

  const indexItem = _.findIndex(stackBlocks, (item) => {
    return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
  });

  const attribute = _.get(selectItem, ["attribute", selectedLayoutDesign]);
  const columnItems = _.get(attribute, ["columnItems"]);

  const indexColumnItem = _.findIndex(columnItems, (item) => {
    return _.get(item, ["id"]) === selectedStackBlockColumnItem;
  });

  const currentColumn = _.get(columnItems, [indexColumnItem]);

  const {
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      value: _.get(currentColumn, ["attribute", "value"], ""),
      color: _.get(currentColumn, ["attribute", "color"], "#000000"),
      fontSize: String(_.get(currentColumn, ["attribute", "fontSize"], 16)),
      fontWeight: String(_.get(currentColumn, ["attribute", "fontWeight"], 400)),
      fontFamily: _.get(currentColumn, ["attribute", "fontFamily"], "IBMPlexSansThai"),
      textAlign: _.get(currentColumn, ["attribute", "textAlign"], "left"),

      justifyContent: _.get(currentColumn, ["attribute", "justifyContent"], "flex-start"),
      alignItems: _.get(currentColumn, ["attribute", "alignItems"], "flex-start"),

      backgroundColor: _.get(currentColumn, ["attribute", "backgroundColor"]),
      borderTopLeftRadius: _.get(currentColumn, ["attribute", "borderTopLeftRadius"], 0),
      borderTopRightRadius: _.get(currentColumn, ["attribute", "borderTopRightRadius"], 0),
      borderBottomLeftRadius: _.get(currentColumn, ["attribute", "borderBottomLeftRadius"], 0),
      borderBottomRightRadius: _.get(currentColumn, ["attribute", "borderBottomRightRadius"], 0),
    },
  });
  // for text
  const value = watch("value");
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

  useEffect(() => {
    if (indexItem === -1 && indexColumnItem === -1) {
      return;
    }
    const updateCurrentColumn = {
      ...currentColumn,
      attribute: {
        ...currentColumn?.attribute,
        value,
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
      },
    };

    if (_.isEqual(updateCurrentColumn, currentColumn)) {
      return;
    }

    const updateColumnItem = [...columnItems];
    updateColumnItem[indexColumnItem] = {
      ...updateCurrentColumn,
    };

    const updateSelectItem = {
      ...selectItem,
      attribute: {
        ...selectItem?.attribute,
        [selectedLayoutDesign]: {
          ...selectItem?.attribute[selectedLayoutDesign],
          columnItems: updateColumnItem,
        },
      },
    };

    const updatedBlocks = [...stackBlocks];
    updatedBlocks[indexItem] = {
      ...updateSelectItem,
    };
    batch(() => {
      dispatch(setStackBlocks(updatedBlocks));
    });
  }, [
    value,
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
  ]);

  useEffect(() => {
    const attributeDevice = _.get(selectItem, ["attribute", selectedLayoutDesign]);
    const attributeCurrentColumnItem = _.get(attributeDevice, ["columnItems", indexColumnItem, "attribute"]);
    reset({
      value: _.get(attributeCurrentColumnItem, ["value"], ""),
      color: _.get(attributeCurrentColumnItem, ["color"], "#000000"),
      fontSize: String(_.get(attributeCurrentColumnItem, ["fontSize"], "16")),
      fontWeight: String(_.get(attributeCurrentColumnItem, ["fontWeight"], "400")),
      fontFamily: _.get(attributeCurrentColumnItem, ["fontFamily"], "IBMPlexSansThai"),
      textAlign: _.get(attributeCurrentColumnItem, ["textAlign"], "left"),

      justifyContent: _.get(attributeCurrentColumnItem, ["justifyContent"], "flex-start"),
      alignItems: _.get(attributeCurrentColumnItem, ["alignItems"], "flex-start"),

      backgroundColor: _.get(attributeCurrentColumnItem, ["backgroundColor"]),
      borderTopLeftRadius: _.get(attributeCurrentColumnItem, ["borderTopLeftRadius"], 0),
      borderTopRightRadius: _.get(attributeCurrentColumnItem, ["borderTopRightRadius"], 0),
      borderBottomLeftRadius: _.get(attributeCurrentColumnItem, ["borderBottomLeftRadius"], 0),
      borderBottomRightRadius: _.get(attributeCurrentColumnItem, ["borderBottomRightRadius"], 0),
    });
  }, [selectedLayoutDesign, currentColumn]);

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
      <TextArea
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $control={control}
        $name="value"
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
