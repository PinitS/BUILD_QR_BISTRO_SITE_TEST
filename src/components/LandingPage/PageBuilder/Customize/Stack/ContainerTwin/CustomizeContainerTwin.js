import { Button } from "@components/LandingPage/Base/Button";
import { Text } from "@components/LandingPage/Base/Text";
import _ from "lodash";
import React, { useEffect } from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import ICON_CUSTOMIZE_CLOSE from "@assets/svgs/PAGE_BUILDER/MENU/ICON_CUSTOMIZE_CLOSE.svg";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { CustomizeBlock } from "@components/LandingPage/PageBuilder/Customize/Stack/ContainerTwin/CustomizeBlock";
import { setSelectedStackBlockColumnItem } from "@redux/reducers/selectedStackBlockColumnItem.reducers";
import { CustomizeColumnItem } from "../CustomizeColumnItem";
// import { CustomizeColumnItem } from "./CustomizeColumnItem";

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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 310px;
  overflow-y: scroll;
`;

const ContainerFooter = styled.div`
  display: grid;
  grid-template-columns: ${({ $columnRatio = "50% 50%" }) => $columnRatio};
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

export const CustomizeContainerTwin = () => {
  const dispatch = useDispatch();
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const selectedStackBlockColumnItem = useSelector(
    (state) => state?.selectedStackBlockColumnItem?.data,
    shallowEqual,
  );

  console.log("selectedStackBlockColumnItem :>> ", selectedStackBlockColumnItem);

  const activeIndex = _.chain(stackBlocks)
    .get([selectedLayoutDesign])
    .findIndex((item) => {
      return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
    })
    .value();

  const selectItem = _.chain(stackBlocks).get([selectedLayoutDesign, activeIndex]).value();

  const columnItems = _.get(selectItem, ["columnItems"]);

  const columnRatio = _.chain(selectItem)
    .get(["columnRatio"])
    .thru((arr) => {
      const total = _.sum(arr) || 1;
      return _.map(arr, (item) => `${item / total}fr`);
    })
    .join(" ")
    .value();

  const handleCloseCustomize = () => {
    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false };
    batch(() => {
      dispatch(setSelectedStackBlockColumnItem(null));
      dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
    });
  };

  const handleSelectedColumnItem = ({ columnItemId }) => {
    const updateSelectedStackBlockColumnItem =
      selectedStackBlockColumnItem === columnItemId ? null : columnItemId;
    dispatch(setSelectedStackBlockColumnItem(updateSelectedStackBlockColumnItem));
  };

  useEffect(() => {
    dispatch(setSelectedStackBlockColumnItem(null));
  }, [selectedLayoutDesign]);

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
            Customize Container (Twin)
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
        {_.isNil(selectedStackBlockColumnItem) && <CustomizeBlock />}
        {!_.isNil(selectedStackBlockColumnItem) && <CustomizeColumnItem key={selectedStackBlockColumnItem} />}
      </ContainerInput>
      <Line />
      <ContainerFooter $columnRatio={columnRatio}>
        {_.chain(columnItems)
          .map((item, index) => {
            const id = _.get(item, ["id"]);
            const isActive = id === selectedStackBlockColumnItem;
            return (
              <Button
                key={index}
                $borderRadius={6}
                $height={32}
                $backgroundColor={
                  isActive
                    ? MAIN_COLORS?.MAIN?.BUTTON_CUSTOMIZE_COLUMN_ITEM_BACKGROUND_ACTIVE
                    : MAIN_COLORS?.MAIN?.BUTTON_CUSTOMIZE_COLUMN_ITEM_BACKGROUND_INACTIVE
                }
                $width={"100%"}
                onClick={() => handleSelectedColumnItem({ columnItemId: id })}
              >
                <Text
                  $fontFamily="Sen"
                  $textTransform="capitalize"
                  $color={
                    isActive
                      ? MAIN_COLORS?.MAIN?.BUTTON_CUSTOMIZE_COLUMN_ITEM_TEXT_ACTIVE
                      : MAIN_COLORS?.MAIN?.BUTTON_CUSTOMIZE_COLUMN_ITEM_TEXT_INACTIVE
                  }
                  $fontSize={16}
                  $fontWeight={400}
                  $align="start"
                >
                  {index + 1}
                </Text>
              </Button>
            );
          })
          .value()}
      </ContainerFooter>
    </Container>
  );
};
