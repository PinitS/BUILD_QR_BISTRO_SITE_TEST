import Image from "next/image";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import IMAGE_LOGO from "@assets/staticImages/IMAGE_APP_LOGO.png";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  background: ${MAIN_COLORS?.MAIN?.MENU_BACKGROUND};
  width: 100%;
  border-bottom-color: ${MAIN_COLORS?.MAIN?.LINE};
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;

const LOGO = styled(Image)`
  width: 42px;
  height: 42px;
  border-color: ${MAIN_COLORS?.MAIN?.LINE};
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
`;

const ContainerAction = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const DESIGN_SIZE_LIST = [
  { ICON: ICON_SELECT_DESKTOP, value: "DESKTOP" },
  { ICON: ICON_SELECT_MOBILE, value: "MOBILE" },
];

const SETTING_LIST = [
  { ICON: ICON_MENU_IMPORT_ABSOLUTE, value: "import-free-form" },
  { ICON: ICON_MENU_IMPORT_CONTAINER, value: "import-free-container" },
  { ICON: ICON_MENU_SETTING_BACKGROUND, value: "setting-background" },
  { ICON: ICON_MENU_SWAP, value: "swap-container" },
];

export const ContainerHeader = () => {
  const dispatch = useDispatch();
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  const handleSelectSize = ({ value }) => {
    dispatch(setSelectedLayoutDesign(value));
  };

  return (
    <Container>
      <ContainerAction>
        <LOGO src={IMAGE_LOGO} alt="QR-BISTRO" />

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

      <ContainerAction>
        {_.map(SETTING_LIST, (item, index) => {
          const ICON = _.get(item, ["ICON"]);
          const value = _.get(item, ["value"]);
          const isActive = value === selectedLayoutDesign;
          return (
            <Button
              // onClick={() => handleSelectSize({ value })}
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

      <ContainerAction>
        <Button
          $height={32}
          $pl={12}
          $pr={12}
          $borderRadius={6}
          $backgroundColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
        >
          <Text
            $textTransform="capitalize"
            $color={MAIN_COLORS?.BUTTON?.TEXT}
            $fontSize={14}
            $fontWeight={500}
          >
            Save
          </Text>
        </Button>
        <Button
          $height={32}
          $pl={12}
          $pr={12}
          $borderRadius={6}
          $backgroundColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
        >
          <Text
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
