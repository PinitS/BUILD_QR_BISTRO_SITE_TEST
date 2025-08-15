import { Button } from "@components/LandingPage/Base/Button";
import { Text } from "@components/LandingPage/Base/Text";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import { COLUMN_HEIGHT_OPTIONS_RANGE } from "statics/PAGE_BUILDER_VOID";
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

export const ImportStackContainer = () => {
  const dispatch = useDispatch();
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);
  const importBlockAttr = useSelector((state) => state?.importBlockAttr?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  const handleImportStackContainerMulti = () => {
    const initial = {
      id: uuid(),
      type: "MULTI",
      height: _.get(COLUMN_HEIGHT_OPTIONS_RANGE, [selectedLayoutDesign, "default"]),
      spacing: 8,
      paddingHorizontal: 8,
      paddingVertical: 8,
      columns: 4,
      aspectRatio: null,
      columnItems: [
        { id: uuid(), type: "EMPTY", backgroundColor: "#D6D6D6" },
        { id: uuid(), type: "EMPTY", backgroundColor: "#ADADAD" },
        { id: uuid(), type: "EMPTY", backgroundColor: "#999999" },
        { id: uuid(), type: "EMPTY", backgroundColor: "#707070" },
      ],
    };

    const updateStackBlocks = {
      ...stackBlocks,
      [selectedLayoutDesign]: [...stackBlocks[selectedLayoutDesign], initial],
    };
    batch(() => {
      dispatch(setStackBlocks(updateStackBlocks));
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
          Import Stack
        </Text>
        <Line />
      </ContainerHeader>
      <Button
        $borderRadius={6}
        $borderColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
        $height={42}
        $borderStyle="dashed"
        onClick={() => handleImportStackContainerMulti()}
      >
        <Text
          $fontFamily="Sen"
          $textTransform="capitalize"
          $color={MAIN_COLORS?.MAIN?.CONTAINER_IMPORT_TEXT}
          $fontSize={14}
          $fontWeight={500}
          $align="center"
        >
          Container (Multi)
        </Text>
      </Button>

      <Button
        $borderRadius={6}
        $borderColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
        $height={42}
        $borderStyle="dashed"
        // onClick={() => handleImportStackContainerMulti()}
      >
        <Text
          $fontFamily="Sen"
          $textTransform="capitalize"
          $color={MAIN_COLORS?.MAIN?.CONTAINER_IMPORT_TEXT}
          $fontSize={14}
          $fontWeight={500}
          $align="center"
        >
          Container (Twin)
        </Text>
      </Button>

      <Button
        $borderRadius={6}
        $borderColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
        $height={42}
        $borderStyle="dashed"
        // onClick={() => handleImportStackContainerMulti()}
      >
        <Text
          $fontFamily="Sen"
          $textTransform="capitalize"
          $color={MAIN_COLORS?.MAIN?.CONTAINER_IMPORT_TEXT}
          $fontSize={14}
          $fontWeight={500}
          $align="center"
        >
          Divider
        </Text>
      </Button>

      <Button
        $borderRadius={6}
        $borderColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
        $height={42}
        $borderStyle="dashed"

        // onClick={() => handleImportFreeformImage()}
      >
        <Text
          $fontFamily="Sen"
          $textTransform="capitalize"
          $color={MAIN_COLORS?.MAIN?.CONTAINER_IMPORT_TEXT}
          $fontSize={14}
          $fontWeight={500}
          $align="center"
        >
          Table
        </Text>
      </Button>

      <Button
        $borderRadius={6}
        $borderColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
        $height={42}
        $borderStyle="dashed"

        // onClick={() => handleImportFreeformImage()}
      >
        <Text
          $fontFamily="Sen"
          $textTransform="capitalize"
          $color={MAIN_COLORS?.MAIN?.CONTAINER_IMPORT_TEXT}
          $fontSize={14}
          $fontWeight={500}
          $align="center"
        >
          Zone
        </Text>
      </Button>

      <Button
        $borderRadius={6}
        $borderColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
        $height={42}
        $borderStyle="dashed"

        // onClick={() => handleImportFreeformImage()}
      >
        <Text
          $fontFamily="Sen"
          $textTransform="capitalize"
          $color={MAIN_COLORS?.MAIN?.CONTAINER_IMPORT_TEXT}
          $fontSize={14}
          $fontWeight={500}
          $align="center"
        >
          Map
        </Text>
      </Button>
    </Container>
  );
};
