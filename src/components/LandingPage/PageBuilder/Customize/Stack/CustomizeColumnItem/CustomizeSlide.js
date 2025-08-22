import { ColorPicker } from "@components/LandingPage/Base/ColorPicker";
import { Select } from "@components/LandingPage/Base/Select";
import { Slide } from "@components/LandingPage/Base/Slide";
import { UploadSlide } from "@components/LandingPage/Base/UploadSlide";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { COLUMN_ITEM_TYPE, PADDING_RANGE } from "statics/PAGE_BUILDER_COLUMN_ITEM";
import { SLIDE_RADIUS_LIMIT, SLIDE_RANGE_LIST, SLIDE_STYLE_LIST } from "statics/PAGE_BUILDER_SLIDE_CUSTOMIZE";
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

// const ContainerUploadSlide = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${MAIN_SIZE?.SPACING}px;
//   height: 212px;
//   overflow-y: scroll;
// `;

export const CustomizeSlide = ({ $selectItem, $activeColumnIndex, $activeStackBlockIndex }) => {
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

      totalSlides: _.get($selectItem, ["totalSlides"], 2),
      slideValues: _.get($selectItem, ["slideValues"], [null, null, null, null, null, null]),
      slideStyle: _.get($selectItem, ["slideStyle"], "DEFAULT"),
      delay: _.get($selectItem, ["delay"], 1),
      borderSlideRadius: _.get($selectItem, ["borderSlideRadius"], 0),

      backgroundColor: _.get($selectItem, ["backgroundColor"]),
      borderTopLeftRadius: _.get($selectItem, ["borderTopLeftRadius"], 0),
      borderTopRightRadius: _.get($selectItem, ["borderTopRightRadius"], 0),
      borderBottomLeftRadius: _.get($selectItem, ["borderBottomLeftRadius"], 0),
      borderBottomRightRadius: _.get($selectItem, ["borderBottomRightRadius"], 0),

      paddingHorizontal: _.get($selectItem, ["paddingHorizontal"], 0),
      paddingVertical: _.get($selectItem, ["paddingVertical"], 0),
    },
  });

  const type = watch("type");

  // for slide
  const totalSlides = watch("totalSlides");
  const slideValues = watch("slideValues");
  const slideStyle = watch("slideStyle");
  const delay = watch("delay");
  const borderSlideRadius = watch("borderSlideRadius");
  // for slide

  const backgroundColor = watch("backgroundColor");
  const borderTopLeftRadius = watch("borderTopLeftRadius");
  const borderTopRightRadius = watch("borderTopRightRadius");
  const borderBottomLeftRadius = watch("borderBottomLeftRadius");
  const borderBottomRightRadius = watch("borderBottomRightRadius");

  const paddingHorizontal = watch("paddingHorizontal");
  const paddingVertical = watch("paddingVertical");

  useEffect(() => {
    if ($activeStackBlockIndex === -1 && $activeColumnIndex === -1) {
      return;
    }

    const updateStackColumnItem = {
      ...$selectItem,
      id: $selectItem?.id,
      type,
      totalSlides,
      slideValues,
      slideStyle,
      delay,
      borderSlideRadius,
      backgroundColor,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      paddingHorizontal,
      paddingVertical,
    };
    console.log("updateStackColumnItem :>> ", updateStackColumnItem);
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
    totalSlides,
    slideValues,
    slideStyle,
    borderSlideRadius,
    delay,
    backgroundColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    paddingHorizontal,
    paddingVertical,
  ]);
  console.log("borderSlideRadius :>> ", borderSlideRadius);
  console.log("slideValues :>> ", slideValues);

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
      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={SLIDE_RANGE_LIST}
        $control={control}
        $name="totalSlides"
        $label="Total Slides"
      />
      <Line />
      {/* <ContainerUploadSlide> */}
      {_.chain(slideValues)
        .take(totalSlides)
        .map((item, index) => {
          return (
            <UploadSlide
              key={index}
              $setValue={setValue}
              $value={slideValues[index]}
              $values={slideValues}
              $nameValue={"slideValues"}
              $index={index}
              $backgroundColor={backgroundColor}
            />
          );
        })
        .value()}
      {/* </ContainerUploadSlide> */}
      <Line />
      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={SLIDE_STYLE_LIST}
        $control={control}
        $name="slideStyle"
        $label="Slide Style"
      />
      <Slide
        $label="Delay (Auto Slide)"
        $fontFamily="Sen"
        $name="delay"
        $min={1}
        $max={10}
        $valueIndicator={delay}
        $control={control}
      />

      <Slide
        $label="Radius (Slide)"
        $fontFamily="Sen"
        $name="borderSlideRadius"
        $min={SLIDE_RADIUS_LIMIT?.min}
        $max={SLIDE_RADIUS_LIMIT?.max}
        $valueIndicator={borderSlideRadius}
        $control={control}
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
        $label="Padding (Vertical)"
        $fontFamily="Sen"
        $name="paddingVertical"
        $min={PADDING_RANGE.MIN}
        $max={PADDING_RANGE.MAX}
        $valueIndicator={paddingVertical}
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
