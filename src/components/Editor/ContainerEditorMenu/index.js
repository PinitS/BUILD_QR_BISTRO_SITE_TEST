import { Button } from "@components/Base/Button";
import React from "react";
import styled from "styled-components";
import ICON_MENU_HIDE from "@assets/svgs/MENU/ICON_MENU_HIDE.svg";
import ICON_MENU_IMPORT_CONTAINER from "@assets/svgs/MENU/ICON_MENU_IMPORT_CONTAINER.svg";
import ICON_MENU_IMPORT_ABSOLUTE from "@assets/svgs/MENU/ICON_MENU_IMPORT_ABSOLUTE.svg";
import ICON_MENU_SETTING_BACKGROUND from "@assets/svgs/MENU/ICON_MENU_SETTING_BACKGROUND.svg";
import ICON_MENU_SWAP from "@assets/svgs/MENU/ICON_MENU_SWAP.svg";
import ICON_MENU_SAVE from "@assets/svgs/MENU/ICON_MENU_SAVE.svg";
import ICON_MENU_SETTING_CONTAINER from "@assets/svgs/MENU/ICON_MENU_SETTING_CONTAINER.svg";

import { Text } from "@components/Base/Text";
import _ from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { EDITOR_DEFAULT_STYLE } from "statics/DEFAULT_STYLE";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { setIsCollapseMenu } from "@redux/reducers/editor/isCollapseMenu.reducers";
import { setActiveMenu } from "@redux/reducers/editor/activeMenu.reducers";
import { setModalAttribute } from "@redux/reducers/base/modalAttribute.reducers";
import { setSelectedFreeformBlock } from "@redux/reducers/editor/selectedFreeformBlock.reducers";

const ContainerWrapper = styled.div`
  top: 0px;
  position: sticky;
`;
const Container = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  background: ${EDITOR_DEFAULT_STYLE?.CONTAINER?.BACKGROUND};
  border-bottom-width: 1px;
  border-bottom-color: #d7d7e0;
  border-bottom-style: solid;
`;

const ContainerList = styled(motion.div)`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const MENU_LIST = [
  { icon: ICON_MENU_IMPORT_ABSOLUTE, type: "import-freeform-block" },
  { icon: ICON_MENU_IMPORT_CONTAINER, type: "import-stack-block" },
  { icon: ICON_MENU_SETTING_BACKGROUND, type: "setting-background" },
];

const CONTAINER_VARIANTS = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  closed: {
    opacity: 0,
    x: -30,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const ITEM_VARIANTS = {
  open: { opacity: 1, x: 0, scale: 1 },
  closed: { opacity: 0, x: -30, scale: 0.95 },
};

const FREEFORM_SETTING_VARIANTS = {
  hidden: {
    scale: 0.5,
    rotate: -90,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  exit: {
    scale: 0.5,
    rotate: -90,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const ContainerEditorMenu = () => {
  const dispatch = useDispatch();
  const isCollapseMenu = useSelector((state) => state?.isCollapseMenu?.data, shallowEqual);
  const activeMenu = useSelector((state) => state?.activeMenu?.data, shallowEqual);
  const modalAttribute = useSelector((state) => state?.modalAttribute?.data, shallowEqual);

  const selectedFreeformBlock = useSelector((state) => state?.selectedFreeformBlock?.data, shallowEqual);

  const handleMenuAction = ({ type }) => {
    const updateActiveMenu = activeMenu === type ? null : type;
    batch(() => {
      dispatch(setActiveMenu(updateActiveMenu));
      dispatch(setModalAttribute({ type, isVisible: true }));
    });
  };

  const handleSwapComponent = () => {
    const updateActiveMenu = activeMenu === "swap-blocks" ? null : "swap-blocks";
    dispatch(setActiveMenu(updateActiveMenu));
  };

  const handleSave = async () => {
    dispatch(setActiveMenu(null));
  };

  const handlePublish = async () => {
    dispatch(setActiveMenu(null));
  };

  const handleToggleCollapseMenu = () => {
    const updateIsCollapseMenu = !isCollapseMenu;
    batch(() => {
      dispatch(setIsCollapseMenu(updateIsCollapseMenu));
      dispatch(setActiveMenu(null));
      dispatch(setSelectedFreeformBlock(null));
    });
  };

  const handleFreeformOpenModal = () => {
    const type = _.get(selectedFreeformBlock, ["type"]);
    const modalType = _.toLower(`setting-freeform-${type}`);
    batch(() => {
      dispatch(setModalAttribute({ type: modalType, isVisible: true }));
    });
  };

  return (
    <ContainerWrapper>
      <Container>
        <motion.div
          animate={{ rotate: isCollapseMenu ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Button
            $height={32}
            $isSquare
            $backgroundColor={
              !isCollapseMenu
                ? EDITOR_DEFAULT_STYLE?.MENU?.BACKGROUND_ACTIVE
                : EDITOR_DEFAULT_STYLE?.MENU?.BACKGROUND_INACTIVE
            }
            $borderRadius={8}
            onClick={() => handleToggleCollapseMenu()}
          >
            <ICON_MENU_HIDE
              width={16}
              height={16}
              fill={
                !isCollapseMenu
                  ? EDITOR_DEFAULT_STYLE?.MENU?.ICON_FILL_ACTIVE
                  : EDITOR_DEFAULT_STYLE?.MENU?.ICON_FILL_INACTIVE
              }
            />
          </Button>
        </motion.div>

        <AnimatePresence>
          {isCollapseMenu && (
            <ContainerList
              key="menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={CONTAINER_VARIANTS}
            >
              {_.map(MENU_LIST, (item, index) => {
                const ICON = _.get(item, ["icon"]);
                const type = _.get(item, ["type"]);

                const isActive = activeMenu === type;

                return (
                  <motion.div key={index} variants={ITEM_VARIANTS}>
                    <Button
                      onClick={() => handleMenuAction({ type })}
                      $height={32}
                      $isSquare
                      $backgroundColor={
                        isActive
                          ? EDITOR_DEFAULT_STYLE?.MENU?.BACKGROUND_ACTIVE
                          : EDITOR_DEFAULT_STYLE?.MENU?.BACKGROUND_INACTIVE
                      }
                      $borderRadius={8}
                    >
                      <ICON
                        width={16}
                        height={16}
                        fill={
                          isActive
                            ? EDITOR_DEFAULT_STYLE?.MENU?.ICON_FILL_ACTIVE
                            : EDITOR_DEFAULT_STYLE?.MENU?.ICON_FILL_INACTIVE
                        }
                      />
                    </Button>
                  </motion.div>
                );
              })}
              <motion.div key="swap-blocks" variants={ITEM_VARIANTS}>
                <Button
                  onClick={() => handleSwapComponent()}
                  $height={32}
                  $isSquare
                  $backgroundColor={
                    activeMenu === "swap-blocks"
                      ? EDITOR_DEFAULT_STYLE?.MENU?.BACKGROUND_ACTIVE
                      : EDITOR_DEFAULT_STYLE?.MENU?.BACKGROUND_INACTIVE
                  }
                  $borderRadius={8}
                >
                  <ICON_MENU_SWAP
                    width={16}
                    height={16}
                    fill={
                      activeMenu === "swap-blocks"
                        ? EDITOR_DEFAULT_STYLE?.MENU?.ICON_FILL_ACTIVE
                        : EDITOR_DEFAULT_STYLE?.MENU?.ICON_FILL_INACTIVE
                    }
                  />
                </Button>
              </motion.div>
              <motion.div key="save" variants={ITEM_VARIANTS}>
                <Button
                  onClick={() => handleSave()}
                  $height={32}
                  $isSquare
                  $backgroundColor={EDITOR_DEFAULT_STYLE?.MENU?.BACKGROUND_INACTIVE}
                  $borderRadius={8}
                >
                  <ICON_MENU_SAVE
                    width={16}
                    height={16}
                    fill={EDITOR_DEFAULT_STYLE?.MENU?.ICON_FILL_INACTIVE}
                  />
                </Button>
              </motion.div>
              <motion.div key="publish" variants={ITEM_VARIANTS}>
                <Button
                  onClick={() => handlePublish()}
                  $height={32}
                  $width={84}
                  $isSquare
                  $backgroundColor={EDITOR_DEFAULT_STYLE?.MENU?.BACKGROUND_INACTIVE}
                  $borderRadius={8}
                >
                  <Text
                    $textTransform="capitalize"
                    $color={EDITOR_DEFAULT_STYLE?.MENU?.ICON_FILL_INACTIVE}
                    $fontSize={14}
                    $fontWeight={500}
                  >
                    publish
                  </Text>
                </Button>
              </motion.div>
            </ContainerList>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedFreeformBlock && (
            <motion.div
              variants={FREEFORM_SETTING_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ position: "absolute", right: 16 }}
            >
              <Button
                $height={32}
                $isSquare
                $backgroundColor={
                  _.chain(modalAttribute).get(["type"]).includes("setting-freeform").value()
                    ? EDITOR_DEFAULT_STYLE?.MENU?.BACKGROUND_ACTIVE
                    : EDITOR_DEFAULT_STYLE?.MENU?.BACKGROUND_INACTIVE
                }
                $borderRadius={8}
                onClick={() => handleFreeformOpenModal()}
              >
                <ICON_MENU_SETTING_CONTAINER
                  width={16}
                  height={16}
                  fill={
                    _.chain(modalAttribute).get(["type"]).includes("setting-freeform").value()
                      ? EDITOR_DEFAULT_STYLE?.MENU?.ICON_FILL_ACTIVE
                      : EDITOR_DEFAULT_STYLE?.MENU?.ICON_FILL_INACTIVE
                  }
                />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </ContainerWrapper>
  );
};
