import { Button } from "@components/LandingPage/Base/Button";
import { Input } from "@components/LandingPage/Base/Input";
import { Text } from "@components/LandingPage/Base/Text";
import _ from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import ICON_CUSTOMIZE_CLOSE from "@assets/svgs/PAGE_BUILDER/MENU/ICON_CUSTOMIZE_CLOSE.svg";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";

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

  const handleCloseCustomize = () => {
    const updateSelectedFreeformBlock = { ...customizeBlockAttr, isVisible: false };
    dispatch(setCustomizeBlockAttr(updateSelectedFreeformBlock));
  };
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
          onClick={() => handleCloseCustomize()}
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
