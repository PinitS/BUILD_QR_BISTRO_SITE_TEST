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
import { Slide } from "@components/LandingPage/Base/Slide";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import { DIRECTION_OPTIONS } from "statics/PAGE_BUILDER_VOID";
import { Select } from "@components/LandingPage/Base/Select";

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

export const CustomizeStackVoid = () => {
  const dispatch = useDispatch();
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

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
      spacing: String(_.get(attribute, ["spacing"])),
      direction: _.get(attribute, ["direction"]),
      alignItems: _.get(attribute, ["alignItems"]),
      justifyContent: _.get(attribute, ["justifyContent"]),
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

  const spacing = watch("spacing");
  const direction = watch("direction");
  const alignItems = watch("alignItems");
  const justifyContent = watch("justifyContent");
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
          spacing: Number(spacing),
          direction,
          alignItems,
          justifyContent,
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

    dispatch(setStackBlocks(updatedBlocks));
  }, [spacing, direction, alignItems, justifyContent, paddingHorizontal, paddingVertical]);

  useEffect(() => {
    const attributeDevice = _.get(selectItem, ["attribute", selectedLayoutDesign]);
    reset({
      spacing: _.get(attributeDevice, ["spacing"]),
      direction: _.get(attributeDevice, ["direction"]),
      alignItems: _.get(attributeDevice, ["alignItems"]),
      justifyContent: _.get(attributeDevice, ["justifyContent"]),
      paddingHorizontal: _.get(attributeDevice, ["paddingHorizontal"]),
      paddingVertical: _.get(attributeDevice, ["paddingVertical"]),
    });
  }, [selectedLayoutDesign, selectItem]);

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
            Customize Stack (Void)
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

        <Select
          $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
          $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
          $fontFamily="Sen"
          $options={DIRECTION_OPTIONS}
          $control={control}
          $name="direction"
          $label="direction"
        />

        <Slide
          $label="Spacing"
          $fontFamily="Sen"
          $name="spacing"
          $min={0}
          $max={250}
          $valueIndicator={spacing}
          $control={control}
        />

        <Slide
          $label="Padding (Horizontal)"
          $fontFamily="Sen"
          $name="paddingHorizontal"
          $min={0}
          $max={250}
          $valueIndicator={paddingHorizontal}
          $control={control}
        />

        <Slide
          $label="Padding (Vertical)"
          $fontFamily="Sen"
          $name="paddingVertical"
          $min={0}
          $max={250}
          $valueIndicator={paddingVertical}
          $control={control}
        />

        {/* <Select
          $disabled={_.isNil(value)}
          $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
          $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
          $fontFamily="Sen"
          $options={FILTER_OPTIONS}
          $control={control}
          $name="filterType"
          $label="filter"
        /> */}

        {/* <Slide
          $disabled={filterType === "NONE"}
          $label="Filter value"
          $fontFamily="Sen"
          $name="filterValue"
          $min={attributeFilterValue?.min}
          $max={attributeFilterValue?.max}
          $isShowValue={filterType !== "NONE"}
          $valueIndicator={((filterValue / attributeFilterValue?.max) * 100).toFixed(0)}
          $control={control}
        /> */}
      </ContainerInput>
    </Container>
  );
};
