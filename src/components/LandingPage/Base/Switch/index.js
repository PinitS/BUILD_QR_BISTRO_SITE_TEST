import React, { useEffect } from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const LayoutSwitch = styled(motion.div)`
  position: relative;
  background-color: ${({ $layoutBackground }) => $layoutBackground};
  width: ${({ $layoutWidth }) => $layoutWidth}px;
  height: ${({ $layoutHeight }) => $layoutHeight}px;
  border-radius: ${({ $layoutRadius }) => $layoutRadius}px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const InnerSwitch = styled(motion.div)`
  position: absolute;
  background-color: ${({ $innerBackground }) => $innerBackground};
  width: ${({ $innerWidth }) => $innerWidth}px;
  height: ${({ $innerHeight }) => $innerHeight}px;
  border-radius: ${({ $innerRadius }) => $innerRadius}px;
`;

export const Switch = ({
  $name,
  $control,

  $layoutWidth = 48,
  $layoutHeight = 28,
  $layoutRadius = 5,

  $innerWidth = 22,
  $innerHeight = 22,
  $innerRadius = 4,
  $spacing = 3,

  $layoutBackgroundActive = MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR,
  $layoutBackgroundInActive = "#AAABAD",

  $innerBackgroundActive = MAIN_COLORS?.MAIN?.CONTAINER_CUSTOMIZE,
  $innerBackgroundInActive = "#79797a",
}) => {
  const {
    field: { value = false, onChange },
  } = useController({
    name: $name,
    control: $control,
  });

  const motionValue = useMotionValue(value ? 1 : 0);

  useEffect(() => {
    animate(motionValue, value ? 1 : 0, { duration: 0.2 });
  }, [value]);

  const translateX = useTransform(motionValue, [0, 1], [$spacing, $layoutWidth - ($innerWidth + $spacing)]);

  return (
    <Container>
      <LayoutSwitch
        $layoutBackground={value ? $layoutBackgroundActive : $layoutBackgroundInActive}
        $layoutWidth={$layoutWidth}
        $layoutHeight={$layoutHeight}
        $layoutRadius={$layoutRadius}
        onClick={() => onChange(!value)}
      >
        <InnerSwitch
          $innerBackground={value ? $innerBackgroundActive : $innerBackgroundInActive}
          $innerWidth={$innerWidth}
          $innerHeight={$innerHeight}
          $innerRadius={$innerRadius}
          style={{ x: translateX }}
        />
      </LayoutSwitch>
    </Container>
  );
};
