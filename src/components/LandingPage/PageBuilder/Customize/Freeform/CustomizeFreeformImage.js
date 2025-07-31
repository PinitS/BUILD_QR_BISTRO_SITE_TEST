import { Button } from "@components/LandingPage/Base/Button";
import { Text } from "@components/LandingPage/Base/Text";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import ICON_CUSTOMIZE_CLOSE from "@assets/svgs/PAGE_BUILDER/MENU/ICON_CUSTOMIZE_CLOSE.svg";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { setFreeformBlocks } from "@redux/reducers/freeformBlocks.reducers";
import { Select } from "@components/LandingPage/Base/Select";
import { ColorPicker } from "@components/LandingPage/Base/ColorPicker";
import {
  ASPECT_RATIO_LIST,
  FILTER_OPTIONS,
  FILTER_OPTIONS_RANGE,
  RESIZE_OPTIONS,
} from "statics/PAGE_BUILDER_IMAGE_CUSTOMIZE";
import { UploadFile } from "@components/LandingPage/Base/UploadFile";
import { Slide } from "@components/LandingPage/Base/Slide";
import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: ${MAIN_SIZE?.SPACING}px;
  gap: ${MAIN_SIZE?.SPACING}px;
`;

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${MAIN_SIZE?.SPACING / 2}px;
`;

const ContainerTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${MAIN_COLORS?.MAIN?.LINE};
`;

const ContainerInput = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  gap: ${MAIN_SIZE?.SPACING}px;
  overflow-y: scroll;
`;

export const CustomizeFreeformImage = () => {
  const dispatch = useDispatch();
  const { containerWidth } = useContainerDimensionContext();
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  const selectItem = _.chain(freeformBlocks)
    .find((item) => {
      return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
    })
    .value();

  const indexItem = _.findIndex(freeformBlocks, (item) => {
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
      value: _.get(selectItem, ["value"]),
      aspectRatio: _.get(selectItem, ["aspectRatio"]),
      resize: String(_.get(selectItem, ["resize"])),
      filterType: _.get(selectItem, ["filterType"]),
      filterValue: _.get(selectItem, ["filterValue"]),
      radius: _.get(selectItem, ["radius"]),
      size: _.get(attribute, ["size"]),
      backgroundColor: _.get(selectItem, ["backgroundColor"]),
    },
  });

  const handleCloseCustomize = () => {
    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false };
    dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
  };

  const handleRemoveItem = () => {
    const updateFreeformBlocks = _.filter(freeformBlocks, (item, index) => {
      return _.get(selectItem, ["id"]) !== _.get(item, ["id"]);
    });
    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false, id: null };
    batch(() => {
      dispatch(setFreeformBlocks(updateFreeformBlocks));
      dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
    });
  };

  const value = watch("value");
  const aspectRatio = watch("aspectRatio");
  const resize = watch("resize");
  const radius = watch("radius");
  const filterType = watch("filterType");
  const filterValue = watch("filterValue");

  const size = watch("size");
  const backgroundColor = watch("backgroundColor");

  useEffect(() => {
    if (indexItem === -1) {
      return;
    }
    const updateFilterValue =
      filterType !== _.get(selectItem, ["filterType"])
        ? _.get(FILTER_OPTIONS_RANGE, [filterType, "default"])
        : filterValue;

    const updateSelectItem = {
      ...selectItem,
      value,
      aspectRatio,
      resize,
      radius: Number(radius),
      filterType,
      filterValue: updateFilterValue,
      backgroundColor,
      attribute: {
        ...selectItem?.attribute,
        [selectedLayoutDesign]: {
          ...selectItem?.attribute[selectedLayoutDesign],
          size: Number(size),
        },
      },
    };

    if (_.isEqual(updateSelectItem, selectItem)) {
      return;
    }

    const updatedBlocks = [...freeformBlocks];
    updatedBlocks[indexItem] = {
      ...updateSelectItem,
    };
    dispatch(setFreeformBlocks(updatedBlocks));
  }, [value, aspectRatio, resize, radius, size, filterType, filterValue, backgroundColor]);

  useEffect(() => {
    const attributeDevice = _.get(selectItem, ["attribute", selectedLayoutDesign]);
    reset({
      value: _.get(selectItem, ["value"]),
      aspectRatio: _.get(selectItem, ["aspectRatio"]),
      resize: String(_.get(selectItem, ["resize"])),
      radius: _.get(selectItem, ["radius"]),
      size: _.get(attributeDevice, ["size"]),
      filterType: _.get(selectItem, ["filterType"]),
      filterValue: _.get(selectItem, ["filterValue"]),
      backgroundColor: _.get(selectItem, ["backgroundColor"]),
    });
  }, [selectedLayoutDesign, selectItem]);

  const attributeFilterValue = _.get(FILTER_OPTIONS_RANGE, [filterType]);

  return (
    <Container>
      <ContainerHeader>
        <ContainerTitle>
          <Text
            $fontFamily="Sen"
            $textTransform="capitalize"
            $color={MAIN_COLORS?.MAIN?.CONTAINER_CUSTOMIZE_TEXT}
            $fontSize={16}
            $fontWeight={500}
            $align="start"
          >
            Customize Freeform (Image)
          </Text>
          <Button $height={24} $isSquare $mt={4} onClick={() => handleCloseCustomize()}>
            <ICON_CUSTOMIZE_CLOSE
              width={18}
              height={18}
              stroke={MAIN_COLORS?.MAIN?.CONTAINER_CUSTOMIZE_TEXT}
            />
          </Button>
        </ContainerTitle>

        <Line />
      </ContainerHeader>
      <ContainerInput>
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

        <UploadFile
          $setValue={setValue}
          $value={value}
          $aspectRatio={aspectRatio}
          $backgroundColor={backgroundColor}
        />

        <Slide
          $label="Size"
          $fontFamily="Sen"
          $name="size"
          $min={50}
          $max={containerWidth}
          $valueIndicator={((size / containerWidth) * 100).toFixed(0)}
          $control={control}
        />

        <Slide
          $label="Radius"
          $fontFamily="Sen"
          $name="radius"
          $min={0}
          $max={50}
          $valueIndicator={(radius * 2).toFixed(0)}
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

        <ColorPicker
          $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
          $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
          $control={control}
          $fontFamily="Sen"
          $name="backgroundColor"
          $label={`background color`}
        />
      </ContainerInput>
    </Container>
  );
};
