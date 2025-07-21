import React from "react";
import styled from "styled-components";
import _ from "lodash";

const GridContainer = styled.div`
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
  height: 100%;
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
`;

export const Grid = ({ $containerWidth, $containerHeight }) => {
  const NUM_COLUMNS = 12;
  const spacing = $containerWidth / NUM_COLUMNS;

  return (
    <GridContainer>
      {_.chain(NUM_COLUMNS + 1)
        .range()
        .map((index) => <VerticalLine key={`v-${index}`} style={{ left: `${index * spacing}px` }} />)
        .value()}
    </GridContainer>
  );
};
