import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled(motion.div)`
  position: absolute;
  top: 77px;
  left: 12px;
  width: 180px;
  height: 200px;
  border-radius: 12px;
  background: white;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const SIDE_MENU_VARIANTS = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const ContainerMainSideMenu = () => {
  const mainSideMenuAttr = useSelector((state) => state?.mainSideMenuAttr?.data, shallowEqual);
  const isVisible = _.get(mainSideMenuAttr, ["isVisible"]);
  return (
    <AnimatePresence>
      {isVisible && (
        <Container variants={SIDE_MENU_VARIANTS} initial="hidden" animate="visible" exit="exit">
          {/* เนื้อหาเมนู */}
        </Container>
      )}
    </AnimatePresence>
  );
};
