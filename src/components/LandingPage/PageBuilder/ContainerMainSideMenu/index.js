import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { SIDE_MENU_VARIANTS } from "statics/VARIANTS";
import { ImportFreeformContainer } from "@components/LandingPage/Import/Freeform/ImportFreeformContainer";

const Container = styled(motion.div)`
  position: absolute;
  top: 77px;
  left: 12px;
  border-radius: 12px;
  background: white;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  z-index: 500;
`;

export const ContainerMainSideMenu = () => {
  const mainSideMenuAttr = useSelector((state) => state?.mainSideMenuAttr?.data, shallowEqual);
  const isVisible = _.get(mainSideMenuAttr, ["isVisible"]);
  const form = _.get(mainSideMenuAttr, ["form"]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Container variants={SIDE_MENU_VARIANTS} initial="hidden" animate="visible" exit="exit">
          {(() => {
            switch (form) {
              case "IMPORT-FREEFORM-CONTAINER":
                return <ImportFreeformContainer />;

              default:
                return null;
            }
          })()}
        </Container>
      )}
    </AnimatePresence>
  );
};
