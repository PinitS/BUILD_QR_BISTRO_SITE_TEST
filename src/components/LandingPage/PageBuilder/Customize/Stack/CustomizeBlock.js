import { Button } from "@components/LandingPage/Base/Button";
import { Select } from "@components/LandingPage/Base/Select";
import { Slide } from "@components/LandingPage/Base/Slide";
import { Text } from "@components/LandingPage/Base/Text";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { setSelectedStackBlockColumnItem } from "@redux/reducers/selectedStackBlockColumnItem.reducers";
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

  const {
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      aspectRatio: _.get(attribute, ["aspectRatio"]),
      height: String(_.get(attribute, ["height"])),
      spacing: String(_.get(attribute, ["spacing"])),
      columns: String(_.get(attribute, ["columns"])),
      paddingHorizontal: String(_.get(attribute, ["paddingHorizontal"])),
      paddingVertical: String(_.get(attribute, ["paddingVertical"])),
    },
  });

  const handleCloseCustomize = () => {
    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false };
    dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
  };

  const handleRemoveItem = () => {
    const updateStackBlocks = _.filter(stackBlocks, (item, index) => {
      return _.get(selectItem, ["id"]) !== _.get(item, ["id"]);
    });
    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false, id: null };
    batch(() => {
      dispatch(setStackBlocks(updateStackBlocks));
      dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
    });
  };

  const height = watch("height");
  const spacing = watch("spacing");
  const columns = watch("columns");
  const aspectRatio = watch("aspectRatio");

  const paddingHorizontal = watch("paddingHorizontal");
  const paddingVertical = watch("paddingVertical");

  useEffect(() => {
    if (indexItem === -1) {
      return;
    }

    const updateSelectItem = {
      ...selectItem,
      attribute: {
        ...selectItem?.attribute,
        [selectedLayoutDesign]: {
          ...selectItem?.attribute[selectedLayoutDesign],
          aspectRatio,
          height: Number(height),
          spacing: Number(spacing),
          columns: Number(columns),
          paddingHorizontal: Number(paddingHorizontal),
          paddingVertical: Number(paddingVertical),
        },
      },
    };

    if (_.isEqual(updateSelectItem, selectItem)) {
      return;
    }

    const updatedBlocks = [...stackBlocks];
    updatedBlocks[indexItem] = {
      ...updateSelectItem,
    };

    batch(() => {
      dispatch(setStackBlocks(updatedBlocks));
    });
  }, [height, aspectRatio, columns, spacing, paddingHorizontal, paddingVertical]);

  useEffect(() => {
    const attributeDevice = _.get(selectItem, ["attribute", selectedLayoutDesign]);
    reset({
      aspectRatio: _.get(attributeDevice, ["aspectRatio"]),
      height: _.get(attributeDevice, ["height"]),
      columns: _.get(attributeDevice, ["columns"]),
      spacing: _.get(attributeDevice, ["spacing"]),
      paddingHorizontal: _.get(attributeDevice, ["paddingHorizontal"]),
      paddingVertical: _.get(attributeDevice, ["paddingVertical"]),
    });
  }, [selectedLayoutDesign]);

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
        $label="columns"
        $fontFamily="Sen"
        $name="columns"
        $min={1}
        $max={4}
        $valueIndicator={columns}
        $control={control}
      />
      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={ASPECT_RATIO_LIST}
        $control={control}
        $name="aspectRatio"
        $label="aspect ratio"
      />
      <Slide
        $disabled={!_.isNil(aspectRatio)}
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
