import { ColorPicker } from "@components/LandingPage/Base/ColorPicker";
import { ContainerSwitch } from "@components/LandingPage/Base/ContainerSwitch";
import { Input } from "@components/LandingPage/Base/Input";
import { Select } from "@components/LandingPage/Base/Select";
import { Slide } from "@components/LandingPage/Base/Slide";
import { Text } from "@components/LandingPage/Base/Text";
import { UploadFile } from "@components/LandingPage/Base/UploadFile";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { COLUMN_ITEM_TYPE, PADDING_RANGE } from "statics/PAGE_BUILDER_COLUMN_ITEM";
import { FILTER_OPTIONS, FILTER_OPTIONS_RANGE, RESIZE_OPTIONS } from "statics/PAGE_BUILDER_IMAGE_CUSTOMIZE";
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

export const CustomizeYoutube = ({ $selectItem, $activeColumnIndex, $activeStackBlockIndex }) => {
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
      url: _.get($selectItem, ["url"]),

      isAutoPlay: _.get($selectItem, ["isAutoPlay"], false),
      isMute: _.get($selectItem, ["isMute"], true),
      isLoop: _.get($selectItem, ["isLoop"], false),

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

  const url = watch("url");
  const isAutoPlay = watch("isAutoPlay");
  const isMute = watch("isMute");
  const isLoop = watch("isLoop");

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
      url,
      isAutoPlay,
      isMute,
      isLoop,
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
    url,
    isAutoPlay,
    isMute,
    isLoop,
    backgroundColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    paddingHorizontal,
    paddingVertical,
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

      <Input
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $control={control}
        $name="url"
        $label="Youtube (url)"
      />

      <ContainerSwitch $label="Auto play" $control={control} $name="isAutoPlay" />
      <ContainerSwitch $label="Mute" $control={control} $name="isMute" />
      <ContainerSwitch $label="Loop" $control={control} $name="isLoop" />

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
