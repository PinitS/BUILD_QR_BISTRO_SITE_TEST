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
import { Select } from "@components/LandingPage/Base/Select";
import { ANIMATION_TYPE_LIST, TYPE_OPTIONS } from "statics/PAGE_BUILDER_BACKGROUND";

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

const ContainerSelectAnimationType = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  max-height: 162px;
  overflow: scroll;
  flex-shrink: 0;
`;

const ContainerSelectAnimationItem = styled(Button)`
  width: 100%;
  background: ${({ $isActive = false }) => ($isActive ? "#ffffff" : "transparent")};
  aspect-ratio: 16/9;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: 1px;
  border-color: #ffffff;
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
      bodyType: _.get(customizeBackground, ["bodyType"]),
      bodyBackgroundImage: _.get(customizeBackground, ["bodyBackgroundImage"], null),
      bodyBackgroundColor: _.get(customizeBackground, ["bodyBackgroundColor"], "transparent"),
      bodyAnimationType: _.get(customizeBackground, ["bodyAnimationType"], "STAR_FIELD"),
      bodyAnimationGradientFlowPrimary: _.get(customizeBackground, ["bodyAnimationGradientFlowPrimary"]),
      bodyAnimationGradientFlowSecondary: _.get(customizeBackground, ["bodyAnimationGradientFlowSecondary"]),

      containerBackgroundColor: _.get(customizeBackground, ["containerBackgroundColor"]),
      containerBackgroundOpacity: _.get(customizeBackground, ["containerBackgroundOpacity"]),
    },
  });

  const handleCloseCustomize = () => {
    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false };
    dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
  };

  const bodyType = watch("bodyType");
  const bodyBackgroundImage = watch("bodyBackgroundImage");
  const bodyBackgroundColor = watch("bodyBackgroundColor");
  const bodyAnimationType = watch("bodyAnimationType");
  const bodyAnimationGradientFlowPrimary = watch("bodyAnimationGradientFlowPrimary");
  const bodyAnimationGradientFlowSecondary = watch("bodyAnimationGradientFlowSecondary");
  const containerBackgroundColor = watch("containerBackgroundColor");
  const containerBackgroundOpacity = watch("containerBackgroundOpacity");

  useEffect(() => {
    const updateCustomizeBackground = {
      ...customizeBackground,
      bodyType,
      bodyBackgroundImage,
      bodyBackgroundColor,
      bodyAnimationType,
      bodyAnimationGradientFlowPrimary,
      bodyAnimationGradientFlowSecondary,
      containerBackgroundColor,
      containerBackgroundOpacity,
    };

    if (_.isEqual(updateCustomizeBackground, customizeBackground)) {
      return;
    }
    dispatch(setCustomizeBackground(updateCustomizeBackground));
  }, [
    bodyType,
    bodyBackgroundImage,
    bodyBackgroundColor,
    bodyAnimationType,
    bodyAnimationGradientFlowPrimary,
    bodyAnimationGradientFlowSecondary,
    containerBackgroundColor,
    containerBackgroundOpacity,
  ]);

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
        <Select
          $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
          $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
          $fontFamily="Sen"
          $options={TYPE_OPTIONS}
          $control={control}
          $name="bodyType"
          $label="type (Body)"
        />

        {bodyType === "COLOR" && (
          <ColorPicker
            $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
            $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
            $control={control}
            $fontFamily="Sen"
            $name="bodyBackgroundColor"
            $label={`background color (Body)`}
          />
        )}

        {bodyType === "IMAGE" && (
          <UploadFile
            $useClearImage={true}
            $setValue={setValue}
            $nameValue="bodyBackgroundImage"
            $value={bodyBackgroundImage}
            $aspectRatio={1}
          />
        )}

        {bodyType === "ANIMATION" && (
          <ContainerSelectAnimationType>
            {_.map(ANIMATION_TYPE_LIST, (item, index) => {
              const isActive = _.get(item, ["value"]) === bodyAnimationType;
              const value = _.get(item, ["value"]);

              return (
                <ContainerSelectAnimationItem
                  key={index}
                  $isActive={isActive}
                  onClick={() => {
                    setValue("bodyAnimationType", value);
                  }}
                >
                  <Text
                    $fontFamily="Sen"
                    $textTransform="capitalize"
                    $color={
                      isActive
                        ? MAIN_COLORS?.MAIN?.CONTAINER_IMPORT_TEXT
                        : MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR
                    }
                    $fontSize={16}
                    $fontWeight={500}
                    $align="start"
                  >
                    {item?.label}
                  </Text>
                </ContainerSelectAnimationItem>
              );
            })}
          </ContainerSelectAnimationType>
        )}

        {bodyAnimationType === "GRADIENT_FLOW" && (
          <React.Fragment>
            <ColorPicker
              $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
              $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
              $control={control}
              $fontFamily="Sen"
              $name="bodyAnimationGradientFlowPrimary"
              $label={`Gradient flow (Primary)`}
            />
            <ColorPicker
              $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
              $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
              $control={control}
              $fontFamily="Sen"
              $name="bodyAnimationGradientFlowSecondary"
              $label={`Gradient flow (Secondary)`}
            />
          </React.Fragment>
        )}

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
