import _ from "lodash";
import React, { useCallback, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { CUSTOMIZE_VARIANTS } from "statics/VARIANTS";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import { CustomizeFreeformText } from "@components/LandingPage/PageBuilder/Customize/Freeform/CustomizeFreeformText";
import { CustomizeFreeformImage } from "./Freeform/CustomizeFreeformImage";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { useClickOutside } from "@hooks/useClickOutside";

const Container = styled(motion.div)`
  position: absolute;
  top: 77px;
  right: 12px;
  border-radius: 12px;
  background: ${MAIN_COLORS?.MAIN?.CONTAINER_CUSTOMIZE};
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  z-index: 500;
`;

export const ContainerCustomizeBlock = () => {
  const dispatch = useDispatch(); // เพิ่ม

  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const isVisible = _.get(customizeBlockAttr, ["isVisible"]);
  const form = _.get(customizeBlockAttr, ["form"]);
  const containerRef = useRef(null);

  const handleClickOutside = useCallback(() => {
    dispatch(setCustomizeBlockAttr({ ...customizeBlockAttr, isVisible: false }));
  }, [customizeBlockAttr, dispatch]);

  useClickOutside({ ref: containerRef, cb: handleClickOutside });

  return (
    <AnimatePresence>
      {isVisible && (
        <Container
          ref={containerRef}
          variants={CUSTOMIZE_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {(() => {
            switch (form) {
              case "CUSTOMIZE-FREEFORM-TEXT":
                return <CustomizeFreeformText />;
              case "CUSTOMIZE-FREEFORM-IMAGE":
                return <CustomizeFreeformImage />;

              default:
                return null;
            }
          })()}
        </Container>
      )}
    </AnimatePresence>
  );
};
