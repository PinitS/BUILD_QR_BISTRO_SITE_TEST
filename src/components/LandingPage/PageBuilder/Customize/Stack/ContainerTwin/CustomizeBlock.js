import { Button } from "@components/LandingPage/Base/Button";
import { Select } from "@components/LandingPage/Base/Select";
import { Slide } from "@components/LandingPage/Base/Slide";
import { Text } from "@components/LandingPage/Base/Text";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import { ASPECT_RATIO_LIST, COLUMN_HEIGHT_OPTIONS_RANGE } from "statics/PAGE_BUILDER_VOID";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${MAIN_SIZE?.SPACING}px;
`;

export const CustomizeBlock = () => {
  const dispatch = useDispatch();
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  const activeIndex = _.chain(stackBlocks)
    .get([selectedLayoutDesign])
    .findIndex((item) => {
      return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
    })
    .value();

  const selectItem = _.chain(stackBlocks).get([selectedLayoutDesign, activeIndex]).value();

  const {
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      aspectRatio: _.get(selectItem, ["aspectRatio"]),
      height: String(_.get(selectItem, ["height"])),
      spacing: String(_.get(selectItem, ["spacing"])),
      columnRatioLeft: String(_.get(selectItem, ["columnRatio", 0])),
      columnRatioRight: String(_.get(selectItem, ["columnRatio", 1])),
      paddingHorizontal: String(_.get(selectItem, ["paddingHorizontal"])),
      paddingVertical: String(_.get(selectItem, ["paddingVertical"])),
    },
  });

  const handleRemoveItem = () => {
    const updatedLayout = _.chain(stackBlocks)
      .get([selectedLayoutDesign])
      .filter((item, index) => {
        return _.get(selectItem, ["id"]) !== _.get(item, ["id"]);
      })
      .value();

    const updateStackBlocks = {
      ...stackBlocks,
      [selectedLayoutDesign]: updatedLayout,
    };

    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false, id: null };
    batch(() => {
      dispatch(setStackBlocks(updateStackBlocks));
      dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
    });
  };

  const height = watch("height");
  const spacing = watch("spacing");
  const columnRatioLeft = watch("columnRatioLeft");
  const columnRatioRight = watch("columnRatioRight");

  const paddingHorizontal = watch("paddingHorizontal");
  const paddingVertical = watch("paddingVertical");

  useEffect(() => {
    if (activeIndex === -1) {
      return;
    }

    const updateStackBlockItem = {
      ...selectItem,
      height: Number(height),
      spacing: Number(spacing),
      columnRatio: [Number(columnRatioLeft), Number(columnRatioRight)],
      paddingHorizontal: Number(paddingHorizontal),
      paddingVertical: Number(paddingVertical),
    };

    if (_.isEqual(updateStackBlockItem, selectItem)) {
      return;
    }

    const updateBlocks = _.chain(stackBlocks)
      .cloneDeep()
      .set([selectedLayoutDesign, activeIndex], updateStackBlockItem)
      .value();

    batch(() => {
      dispatch(setStackBlocks(updateBlocks));
    });
  }, [height, columnRatioLeft, columnRatioRight, spacing, paddingHorizontal, paddingVertical]);

  useEffect(() => {
    reset({
      aspectRatio: _.get(selectItem, ["aspectRatio"]),
      height: _.get(selectItem, ["height"]),
      columns: _.get(selectItem, ["columns"]),
      spacing: _.get(selectItem, ["spacing"]),
      columnRatioLeft: _.get(selectItem, ["columnRatio", 0]),
      columnRatioRight: _.get(selectItem, ["columnRatio", 1]),
      paddingHorizontal: _.get(selectItem, ["paddingHorizontal"]),
      paddingVertical: _.get(selectItem, ["paddingVertical"]),
    });
  }, [_.get(customizeBlockAttr, ["id"])]);

  const handleColumnRatioLeft = (value) => {
    setValue("columnRatioLeft", value);
    setValue("columnRatioRight", 100 - value);
  };
  const handleColumnRatioRight = (value) => {
    setValue("columnRatioRight", value);
    setValue("columnRatioLeft", 100 - value);
  };

  return (
    <Container>
      <Button
        $borderRadius={8}
        $height={MAIN_SIZE?.INPUT_DEFAULT_HEIGHT}
        $backgroundColor={MAIN_COLORS?.MAIN?.ERROR_COLOR}
        $width={"100%"}
        onClick={() => handleRemoveItem()}
      >
        <Text
          $fontFamily="Sen"
          $textTransform="capitalize"
          $color={MAIN_COLORS?.MAIN?.CONTAINER_CUSTOMIZE_TEXT}
          $fontSize={16}
          $fontWeight={400}
          $align="start"
        >
          Delete
        </Text>
      </Button>
      <Slide
        $label="Size (left)"
        $fontFamily="Sen"
        $name="columnRatioLeft"
        $min={20}
        $max={80}
        $valueIndicator={columnRatioLeft}
        $control={control}
        $overrideOnChange={handleColumnRatioLeft}
      />

      <Slide
        $label="Size (right)"
        $fontFamily="Sen"
        $name="columnRatioRight"
        $min={20}
        $max={80}
        $valueIndicator={columnRatioRight}
        $control={control}
        $overrideOnChange={handleColumnRatioRight}
      />

      <Slide
        $label="Height"
        $fontFamily="Sen"
        $name="height"
        $min={_.get(COLUMN_HEIGHT_OPTIONS_RANGE, [selectedLayoutDesign, "min"])}
        $max={_.get(COLUMN_HEIGHT_OPTIONS_RANGE, [selectedLayoutDesign, "max"])}
        $valueIndicator={height}
        $control={control}
      />
      <Slide
        $label="Spacing"
        $fontFamily="Sen"
        $name="spacing"
        $min={0}
        $max={64}
        $valueIndicator={spacing}
        $control={control}
      />
      <Slide
        $label="Padding (Horizontal)"
        $fontFamily="Sen"
        $name="paddingHorizontal"
        $min={0}
        $max={64}
        $valueIndicator={paddingHorizontal}
        $control={control}
      />
      <Slide
        $label="Padding (Vertical)"
        $fontFamily="Sen"
        $name="paddingVertical"
        $min={0}
        $max={64}
        $valueIndicator={paddingVertical}
        $control={control}
      />
    </Container>
  );
};
