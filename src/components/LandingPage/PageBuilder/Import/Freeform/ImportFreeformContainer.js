import { Button } from "@components/LandingPage/Base/Button";
import { Text } from "@components/LandingPage/Base/Text";
import { setFreeformBlocks } from "@redux/reducers/freeformBlocks.reducers";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
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

export const ImportFreeformContainer = () => {
  const dispatch = useDispatch();
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);
  const importBlockAttr = useSelector((state) => state?.importBlockAttr?.data, shallowEqual);

  const handleImportFreeformText = () => {
    const initial = {
      id: uuid(),
      type: "TEXT",
      value: "",
      color: "#17171B",
      fontFamily: "IBMPlexSansThai",
      fontWeight: 400,
      attribute: {
        DESKTOP: {
          isVisible: true,
          x: 0,
          y: 0,
          fontSize: 16,
        },
        MOBILE: { isVisible: true, x: 0, y: 0, fontSize: 12 },
      },
    };

    batch(() => {
      dispatch(setFreeformBlocks([...freeformBlocks, initial]));
      dispatch(setImportBlockAttr({ ...importBlockAttr, isVisible: false }));
    });
  };
  const handleImportFreeformImage = () => {
    const initial = {
      id: uuid(),
      type: "IMAGE",
      value: null,
      aspectRatio: 1 / 1,
      radius: 2,
      resize: "contain",
      backgroundColor: "#000000",
      attribute: {
        DESKTOP: {
          isVisible: true,
          x: 0,
          y: 0,
          size: 200,
        },
        MOBILE: { isVisible: true, x: 0, y: 0, size: 100 },
      },
    };

    batch(() => {
      dispatch(setFreeformBlocks([...freeformBlocks, initial]));
      dispatch(setImportBlockAttr({ ...importBlockAttr, isVisible: false }));
    });
  };

  return (
    <Container>
      <ContainerHeader>
        <Text
          $fontFamily="Sen"
          $textTransform="capitalize"
          $color={MAIN_COLORS?.MAIN?.CONTAINER_IMPORT_TEXT}
          $fontSize={14}
          $fontWeight={600}
          $align="center"
        >
          Import Freeform
        </Text>
        <Line />
      </ContainerHeader>
      <Button
        $borderRadius={6}
        $borderColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
        $height={42}
        onClick={() => handleImportFreeformText()}
      >
        <Text
          $fontFamily="Sen"
          $textTransform="capitalize"
          $color={MAIN_COLORS?.MAIN?.CONTAINER_IMPORT_TEXT}
          $fontSize={14}
          $fontWeight={500}
          $align="center"
        >
          Text
        </Text>
      </Button>

      <Button
        $borderRadius={6}
        $borderColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
        $height={42}
        onClick={() => handleImportFreeformImage()}
      >
        <Text
          $fontFamily="Sen"
          $textTransform="capitalize"
          $color={MAIN_COLORS?.MAIN?.CONTAINER_IMPORT_TEXT}
          $fontSize={14}
          $fontWeight={500}
          $align="center"
        >
          Image
        </Text>
      </Button>
    </Container>
  );
};
