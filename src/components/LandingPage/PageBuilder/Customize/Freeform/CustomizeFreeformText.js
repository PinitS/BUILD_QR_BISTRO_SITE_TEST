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
import {
  ALIGNMENT_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
} from "statics/PAGE_BUILDER_TEXT_CUSTOMIZE";
import { ColorPicker } from "@components/LandingPage/Base/ColorPicker";
import { TextArea } from "@components/LandingPage/Base/TextArea";

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

export const CustomizeFreeformText = () => {
  const dispatch = useDispatch();

  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  const activeIndex = _.chain(freeformBlocks)
    .get([selectedLayoutDesign])
    .findIndex((item) => {
      return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
    })
    .value();

  const selectItem = _.chain(freeformBlocks).get([selectedLayoutDesign, activeIndex]).value();

  const {
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      value: _.get(selectItem, ["value"]),
      color: _.get(selectItem, ["color"]),
      fontSize: String(_.get(selectItem, ["fontSize"])),
      fontWeight: String(_.get(selectItem, ["fontWeight"])),
      fontFamily: _.get(selectItem, ["fontFamily"]),
      textAlign: _.get(selectItem, ["textAlign"]),
    },
  });

  const handleCloseCustomize = () => {
    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false };
    dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
  };

  const handleRemoveItem = () => {
    const updatedLayout = _.chain(freeformBlocks)
      .get([selectedLayoutDesign])
      .filter((item, index) => {
        return _.get(selectItem, ["id"]) !== _.get(item, ["id"]);
      })
      .value();

    const updateBlocks = _.chain(freeformBlocks)
      .cloneDeep()
      .set([selectedLayoutDesign], updatedLayout)
      .value();

    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false, id: null };
    batch(() => {
      dispatch(setFreeformBlocks(updateBlocks));
      dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
    });
  };

  const value = watch("value");
  const color = watch("color");
  const fontSize = watch("fontSize");
  const fontWeight = watch("fontWeight");
  const fontFamily = watch("fontFamily");
  const textAlign = watch("textAlign");

  useEffect(() => {
    if (activeIndex === -1) {
      return;
    }
    const currentFontFamily = _.get(selectItem, ["fontFamily"]);
    let updateFontWeight = _.isEqual(fontFamily, currentFontFamily) ? fontWeight : 400;

    const updateBlockItem = {
      ...selectItem,
      value,
      color,
      fontFamily,
      textAlign,
      fontWeight: Number(updateFontWeight),
      fontSize: Number(fontSize),
    };

    if (_.isEqual(updateBlockItem, selectItem)) {
      return;
    }

    const updateBlocks = _.chain(freeformBlocks)
      .cloneDeep()
      .set([selectedLayoutDesign, activeIndex], updateBlockItem)
      .value();

    dispatch(setFreeformBlocks(updateBlocks));
  }, [value, color, fontSize, fontWeight, fontFamily, textAlign]);

  // // ============

  useEffect(() => {
    reset({
      value: _.get(selectItem, ["value"]),
      color: _.get(selectItem, ["color"]),
      fontSize: String(_.get(selectItem, ["fontSize"])),
      fontWeight: String(_.get(selectItem, ["fontWeight"])),
      fontFamily: _.get(selectItem, ["fontFamily"]),
      textAlign: _.get(selectItem, ["textAlign"]),
    });
  }, [_.get(customizeBlockAttr, ["id"])]);

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
            Customize Freeform (Text)
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
          $options={FONT_FAMILY_OPTIONS}
          $control={control}
          $name="fontFamily"
          $label="font family"
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
          $label={`Color`}
        />
      </ContainerInput>
    </Container>
  );
};
