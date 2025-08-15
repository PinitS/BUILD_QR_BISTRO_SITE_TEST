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
import { COLUMN_ITEM_TYPE } from "statics/PAGE_BUILDER_COLUMN_ITEM";
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
      imageValue: _.get($selectItem, ["imageValue"]),
      resize: String(_.get($selectItem, ["resize"], "contain")),
      filterType: _.get($selectItem, ["filterType"], "NONE"),
      filterValue: _.get($selectItem, ["filterValue"], null),

      backgroundColor: _.get($selectItem, ["backgroundColor"]),
      borderTopLeftRadius: _.get($selectItem, ["borderTopLeftRadius"], 0),
      borderTopRightRadius: _.get($selectItem, ["borderTopRightRadius"], 0),
      borderBottomLeftRadius: _.get($selectItem, ["borderBottomLeftRadius"], 0),
      borderBottomRightRadius: _.get($selectItem, ["borderBottomRightRadius"], 0),
    },
  });

  const type = watch("type");

  // for text
  const imageValue = watch("imageValue");
  const resize = watch("resize");
  const filterType = watch("filterType");
  const filterValue = watch("filterValue");
  // for text

  const backgroundColor = watch("backgroundColor");
  const borderTopLeftRadius = watch("borderTopLeftRadius");
  const borderTopRightRadius = watch("borderTopRightRadius");
  const borderBottomLeftRadius = watch("borderBottomLeftRadius");
  const borderBottomRightRadius = watch("borderBottomRightRadius");

  useEffect(() => {
    if ($activeStackBlockIndex === -1 && $activeColumnIndex === -1) {
      return;
    }

    let updateFilterValue = null;
    if (filterType !== _.get($selectItem, ["filterType"])) {
      updateFilterValue = _.get(FILTER_OPTIONS_RANGE, [filterType, "default"]);
      setValue("filterValue", updateFilterValue);
    } else {
      updateFilterValue = filterValue;
    }
    const updateStackColumnItem = {
      ...$selectItem,
      id: $selectItem?.id,
      type,
      imageValue,
      resize,
      filterType,
      filterValue: Number(filterValue),
      backgroundColor,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
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
    imageValue,
    resize,
    filterType,
    filterValue,
    backgroundColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  ]);

  const attributeFilterValue = _.get(FILTER_OPTIONS_RANGE, [filterType]);

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
      <UploadFile
        $setValue={setValue}
        $value={imageValue}
        $nameValue={"imageValue"}
        // $aspectRatio={aspectRatio}
        $backgroundColor={backgroundColor}
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
