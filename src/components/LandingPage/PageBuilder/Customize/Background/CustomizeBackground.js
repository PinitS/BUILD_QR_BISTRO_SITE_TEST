import { Button } from "@components/LandingPage/Base/Button";
import { Text } from "@components/LandingPage/Base/Text";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import ICON_CUSTOMIZE_CLOSE from "@assets/svgs/PAGE_BUILDER/MENU/ICON_CUSTOMIZE_CLOSE.svg";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { ColorPicker } from "@components/LandingPage/Base/ColorPicker";
import { UploadFile } from "@components/LandingPage/Base/UploadFile";
import { setCustomizeBackground } from "@redux/reducers/customizeBackground.reducers";
import { Slide } from "@components/LandingPage/Base/Slide";

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
  flex-shrink: 0;
`;

const ContainerInput = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  gap: ${MAIN_SIZE?.SPACING}px;
  overflow-y: scroll;
`;

export const CustomizeBackground = () => {
  const dispatch = useDispatch();
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const customizeBackground = useSelector((state) => state?.customizeBackground?.data, shallowEqual);

  const {
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bodyBackgroundImage: _.get(customizeBackground, ["bodyBackgroundImage"]),
      bodyBackgroundColor: _.get(customizeBackground, ["bodyBackgroundColor"]),
      containerBackgroundColor: _.get(customizeBackground, ["containerBackgroundColor"]),
      containerBackgroundOpacity: _.get(customizeBackground, ["containerBackgroundOpacity"]),
    },
  });

  const handleCloseCustomize = () => {
    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false };
    dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
  };

  const bodyBackgroundImage = watch("bodyBackgroundImage");
  const bodyBackgroundColor = watch("bodyBackgroundColor");
  const containerBackgroundColor = watch("containerBackgroundColor");
  const containerBackgroundOpacity = watch("containerBackgroundOpacity");

  useEffect(() => {
    const updateCustomizeBackground = {
      ...customizeBackground,
      bodyBackgroundImage,
      bodyBackgroundColor,
      containerBackgroundColor,
      containerBackgroundOpacity,
    };

    if (_.isEqual(updateCustomizeBackground, customizeBackground)) {
      return;
    }
    dispatch(setCustomizeBackground(updateCustomizeBackground));
  }, [bodyBackgroundImage, bodyBackgroundColor, containerBackgroundColor, containerBackgroundOpacity]);

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
            Customize Background
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
        <UploadFile
          $useClearImage={true}
          $setValue={setValue}
          $nameValue="bodyBackgroundImage"
          $value={bodyBackgroundImage}
          $aspectRatio={1}
        />
        <ColorPicker
          $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
          $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
          $control={control}
          $fontFamily="Sen"
          $name="bodyBackgroundColor"
          $label={`background color (Body)`}
        />
        <Line />

        <ColorPicker
          $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
          $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
          $control={control}
          $fontFamily="Sen"
          $name="containerBackgroundColor"
          $label={`background color (Container)`}
        />
        <Slide
          $label="Opacity"
          $fontFamily="Sen"
          $name="containerBackgroundOpacity"
          $min={0}
          $max={100}
          $valueIndicator={containerBackgroundOpacity}
          $control={control}
        />
      </ContainerInput>
    </Container>
  );
};
