import _ from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IMPORT_VARIANTS } from "statics/VARIANTS";
import { ImportFreeformContainer } from "@components/LandingPage/PageBuilder/Import/Freeform/ImportFreeformContainer";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";

const Container = styled(motion.div)`
  position: absolute;
  top: 77px;
  left: 12px;
  border-radius: 12px;
  background: ${MAIN_COLORS?.MAIN?.CONTAINER_IMPORT};
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  z-index: 500;
`;

export const ContainerImportBlock = () => {
  const importBlockAttr = useSelector((state) => state?.importBlockAttr?.data, shallowEqual);
  const isVisible = _.get(importBlockAttr, ["isVisible"]);
  const form = _.get(importBlockAttr, ["form"]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Container variants={IMPORT_VARIANTS} initial="hidden" animate="visible" exit="exit">
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
