import { Button } from "@components/Base/Button";
import React from "react";
import styled from "styled-components";
import ICON_MENU_HIDE from "@assets/svgs/MENU/ICON_MENU_HIDE.svg";
import ICON_MENU_IMPORT_CONTAINER from "@assets/svgs/MENU/ICON_MENU_IMPORT_CONTAINER.svg";
import ICON_MENU_IMPORT_ABSOLUTE from "@assets/svgs/MENU/ICON_MENU_IMPORT_ABSOLUTE.svg";
import ICON_MENU_SETTING_BACKGROUND from "@assets/svgs/MENU/ICON_MENU_SETTING_BACKGROUND.svg";
import ICON_MENU_SWAP from "@assets/svgs/MENU/ICON_MENU_SWAP.svg";
import ICON_MENU_SAVE from "@assets/svgs/MENU/ICON_MENU_SAVE.svg";

import { Text } from "@components/Base/Text";

const Container = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
`;

const ContainerList = styled.div`
  display: flex;
  gap: 8px;
`;

export const ContainerEditorMenu = () => {
  return (
    <Container>
      <Button
        $height={32}
        $isSquare
        $backgroundColor={"#EFEFEF"}
        $borderRadius={8}
      >
        <ICON_MENU_HIDE width={16} height={16} />
      </Button>
      <ContainerList>
        <Button
          $height={32}
          $isSquare
          $backgroundColor={"#EFEFEF"}
          $borderRadius={8}
        >
          <ICON_MENU_IMPORT_ABSOLUTE width={16} height={16} />
        </Button>
        <Button
          $height={32}
          $isSquare
          $backgroundColor={"#EFEFEF"}
          $borderRadius={8}
        >
          <ICON_MENU_IMPORT_CONTAINER width={16} height={16} />
        </Button>
        <Button
          $height={32}
          $isSquare
          $backgroundColor={"#EFEFEF"}
          $borderRadius={8}
        >
          <ICON_MENU_SETTING_BACKGROUND width={16} height={16} />
        </Button>

        <Button
          $height={32}
          $isSquare
          $backgroundColor={"#EFEFEF"}
          $borderRadius={8}
        >
          <ICON_MENU_SWAP width={16} height={16} />
        </Button>
        <Button
          $height={32}
          $isSquare
          $backgroundColor={"#EFEFEF"}
          $borderRadius={8}
        >
          <ICON_MENU_SAVE width={16} height={16} />
        </Button>
        <Button
          $height={32}
          $width={84}
          $isSquare
          $backgroundColor={"#EFEFEF"}
          $borderRadius={8}
        >
          <Text $color="#3C3C3C" $fontSize={14} $fontWeight={500}>
            PUBLISH
          </Text>
        </Button>
      </ContainerList>
    </Container>
  );
};
