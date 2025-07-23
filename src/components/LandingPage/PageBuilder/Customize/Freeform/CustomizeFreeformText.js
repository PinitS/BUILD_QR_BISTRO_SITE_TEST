import { Input } from "@components/LandingPage/Base/Input";
import { Text } from "@components/LandingPage/Base/Text";
import _ from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useSelector } from "react-redux";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  padding: ${MAIN_SIZE?.SPACING}px;
  gap: ${MAIN_SIZE?.SPACING}px;
`;

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${MAIN_SIZE?.SPACING / 2}px;
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
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  const selectItem = _.chain(freeformBlocks)
    .findIndex((item) => {
      return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
    })
    .thru((index) => {
      return _.get(freeformBlocks, [index]);
    })
    .value();

  const attribute = _.get(selectItem, ["attribute", selectedLayoutDesign]);
  console.log("selectItem :>> ", selectItem);
  console.log("attribute :>> ", attribute);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  return (
    <Container>
      <ContainerHeader>
        <Text
          $fontFamily="Sen"
          $textTransform="capitalize"
          $color={MAIN_COLORS?.MAIN?.CONTAINER_CUSTOMIZE_TEXT}
          $fontSize={16}
          $fontWeight={600}
          $align="center"
        >
          Customize Freeform (Text)
        </Text>
        <Line />
      </ContainerHeader>
      <ContainerInput>
        <Input
          $fontFamily="Sen"
          $control={control}
          $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
          $name="value"
          $label="value"
        />
        <Input
          $fontFamily="Sen"
          $control={control}
          $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
          $name="fontSize"
          $label={`font Size (${selectedLayoutDesign})`}
        />
        <Input
          $fontFamily="Sen"
          $control={control}
          $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
          $name="family"
          $label="family"
        />
        <Input
          $fontFamily="Sen"
          $control={control}
          $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
          $name="fontWeight"
          $label="font Weight"
        />
        <Input
          $fontFamily="Sen"
          $control={control}
          $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
          $name="Color"
          $label={`Color`}
        />
      </ContainerInput>
    </Container>
  );
};
