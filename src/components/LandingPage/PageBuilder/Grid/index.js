import _ from "lodash";
import React from "react";
import { GRID_ATTRIBUTE } from "statics/GRID_ATTRIBUTE";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  z-index: 0;
`;

const VerticalLine = styled.div`
  position: absolute;
  top: 0;
  left: ${({ $left }) => `${$left}%`};
  height: 100%;
  width: 1px;
  background: ${MAIN_COLORS?.MAIN?.LINE};
`;

export const Grid = () => {
  const NUM_COLUMNS = GRID_ATTRIBUTE?.GRID_COLUMN;
  const step = 100 / NUM_COLUMNS;

  return (
    <Container>
      {_.map([...Array(NUM_COLUMNS + 1)], (item, index) => {
        return index !== 0 && <VerticalLine key={`v-${index}`} $left={index * step} />;
      })}
    </Container>
  );
};
