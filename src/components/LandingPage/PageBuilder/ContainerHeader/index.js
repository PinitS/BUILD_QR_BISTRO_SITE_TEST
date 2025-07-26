import Image from "next/image";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import IMAGE_LOGO from "@assets/staticImages/IMAGE_APP_LOGO.png";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import { Button } from "@components/LandingPage/Base/Button";
import { Text } from "@components/LandingPage/Base/Text";
import ICON_SELECT_DESKTOP from "@assets/svgs/PAGE_BUILDER/MENU/ICON_SELECT_DESKTOP.svg";
import ICON_SELECT_MOBILE from "@assets/svgs/PAGE_BUILDER/MENU/ICON_SELECT_MOBILE.svg";
//
import ICON_MENU_IMPORT_ABSOLUTE from "@assets/svgs/PAGE_BUILDER/MENU/ICON_MENU_IMPORT_ABSOLUTE.svg";
import ICON_MENU_IMPORT_CONTAINER from "@assets/svgs/PAGE_BUILDER/MENU/ICON_MENU_IMPORT_CONTAINER.svg";
import ICON_MENU_SETTING_BACKGROUND from "@assets/svgs/PAGE_BUILDER/MENU/ICON_MENU_SETTING_BACKGROUND.svg";
import ICON_MENU_SWAP from "@assets/svgs/PAGE_BUILDER/MENU/ICON_MENU_SWAP.svg";

//
import _ from "lodash";
import { setSelectedLayoutDesign } from "@redux/reducers/selectedLayoutDesign.reducers";
import { MAIN_ATTR } from "statics/PAGE_BUILDER_ATTRIBUTE";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* justify-content: center; */
  align-items: center;
  padding-left: ${MAIN_SIZE?.SPACING}px;
  padding-right: ${MAIN_SIZE?.SPACING}px;
  padding-top: 8px;
  padding-bottom: 8px;
  background: ${MAIN_COLORS?.MAIN?.MENU_BACKGROUND};
  width: 100%;
  border-bottom-color: ${MAIN_COLORS?.MAIN?.LINE};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  height: 65px;
`;

const LOGO = styled(Image)`
  width: 48px;
  aspect-ratio: 1;
  border-color: ${MAIN_COLORS?.MAIN?.LINE};
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
`;

const ContainerAction = styled.div`
  /* position: absolute; */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${MAIN_SIZE?.SPACING}px;
`;

const ContainerActionMenuList = styled(ContainerAction)``;

const DESIGN_SIZE_LIST = [
  { ICON: ICON_SELECT_DESKTOP, value: "DESKTOP" },
  { ICON: ICON_SELECT_MOBILE, value: "MOBILE" },
];

const MAIN_SIDE_MENU_LIST = [
  { ICON: ICON_MENU_IMPORT_ABSOLUTE, value: "IMPORT-FREEFORM-CONTAINER" },
  { ICON: ICON_MENU_IMPORT_CONTAINER, value: "IMPORT-STACK-CONTAINER" },
  { ICON: ICON_MENU_SETTING_BACKGROUND, value: "CUSTOMIZE-BACKGROUND" },
  { ICON: ICON_MENU_SWAP, value: "SWAP-STACK-CONTAINER" },
];

export const ContainerHeader = () => {
  const dispatch = useDispatch();
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const importBlockAttr = useSelector((state) => state?.importBlockAttr?.data, shallowEqual);
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);

  const handleSelectSize = ({ value }) => {
    dispatch(setSelectedLayoutDesign(value));
  };

  const handleSelectMainSideMenu = ({ value }) => {
    const currentMainSideMenuForm = _.get(importBlockAttr, ["form"]);
    const currentMainSideMenuIsVisible = _.get(importBlockAttr, ["isVisible"]);
    const updateImportBlockAttr = !currentMainSideMenuIsVisible
      ? { isVisible: true, form: value }
      : currentMainSideMenuForm === value
        ? { isVisible: false, form: value }
        : { isVisible: true, form: value };
    const updateSelectedFreeformBlock = { ...customizeBlockAttr, isVisible: false };

    batch(() => {
      dispatch(setCustomizeBlockAttr(updateSelectedFreeformBlock));
      dispatch(setImportBlockAttr(updateImportBlockAttr));
    });
  };

  const handleSave = () => {
    console.log("freeformBlocks :>> ", freeformBlocks);
  };

  return (
    <Container>
      <ContainerAction>
        <LOGO src={IMAGE_LOGO} alt={MAIN_ATTR?.IMAGE_ALT} />

        {_.map(DESIGN_SIZE_LIST, (item, index) => {
          const ICON = _.get(item, ["ICON"]);
          const value = _.get(item, ["value"]);
          const isActive = value === selectedLayoutDesign;
          return (
            <Button
              onClick={() => handleSelectSize({ value })}
              key={index}
              $isSquare
              $height={32}
              $borderRadius={6}
              $backgroundColor={isActive ? MAIN_COLORS?.BUTTON?.BACKGROUND : MAIN_COLORS?.BUTTON?.TEXT}
            >
              <ICON
                width={16}
                height={16}
                fill={isActive ? MAIN_COLORS?.BUTTON?.TEXT : MAIN_COLORS?.BUTTON?.BACKGROUND}
              />
            </Button>
          );
        })}
      </ContainerAction>

      <ContainerActionMenuList>
        {_.map(MAIN_SIDE_MENU_LIST, (item, index) => {
          const ICON = _.get(item, ["ICON"]);
          const value = _.get(item, ["value"]);
          const isActive =
            value === _.get(importBlockAttr, ["form"]) && _.get(importBlockAttr, ["isVisible"]);
          return (
            <Button
              onClick={() => handleSelectMainSideMenu({ value })}
              key={index}
              $isSquare
              $height={32}
              $borderRadius={6}
              $backgroundColor={isActive ? MAIN_COLORS?.BUTTON?.BACKGROUND : MAIN_COLORS?.BUTTON?.TEXT}
            >
              <ICON
                width={16}
                height={16}
                fill={isActive ? MAIN_COLORS?.BUTTON?.TEXT : MAIN_COLORS?.BUTTON?.BACKGROUND}
              />
            </Button>
          );
        })}
      </ContainerActionMenuList>

      <ContainerAction>
        <Button
          $height={32}
          $pl={MAIN_SIZE?.SPACING}
          $pr={MAIN_SIZE?.SPACING}
          $borderRadius={6}
          $borderColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
          $backgroundColor={MAIN_COLORS?.BUTTON?.TEXT}
        >
          <Text
            $fontFamily="Sen"
            $textTransform="capitalize"
            $color={MAIN_COLORS?.BUTTON?.BACKGROUND}
            $fontSize={14}
            $fontWeight={500}
          >
            Preview
          </Text>
        </Button>
        <Button
          onClick={() => handleSave()}
          $height={32}
          $pl={MAIN_SIZE?.SPACING}
          $pr={MAIN_SIZE?.SPACING}
          $borderRadius={6}
          $borderColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
          $backgroundColor={MAIN_COLORS?.BUTTON?.TEXT}
        >
          <Text
            $fontFamily="Sen"
            $textTransform="capitalize"
            $color={MAIN_COLORS?.BUTTON?.BACKGROUND}
            $fontSize={14}
            $fontWeight={500}
          >
            Save
          </Text>
        </Button>
        <Button
          $height={32}
          $pl={MAIN_SIZE?.SPACING}
          $pr={MAIN_SIZE?.SPACING}
          $borderRadius={6}
          $backgroundColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
        >
          <Text
            $fontFamily="Sen"
            $textTransform="capitalize"
            $color={MAIN_COLORS?.BUTTON?.TEXT}
            $fontSize={14}
            $fontWeight={500}
          >
            Publish
          </Text>
        </Button>
      </ContainerAction>
    </Container>
  );
};
