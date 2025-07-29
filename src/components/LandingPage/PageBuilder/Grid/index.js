import styled from "styled-components";

const GridContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const VerticalLine = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 1px;
  background-color: red;
  transform: translateX(-0.5px); // ช่วย snap ให้ตรงกลาง pixel
`;

export const Grid = () => {
  const NUM_COLUMNS = 12;
  const step = 100 / NUM_COLUMNS;

  return (
    <GridContainer>
      {[...Array(NUM_COLUMNS + 1)].map((_, index) => (
        <VerticalLine key={index} style={{ left: `${index * step}%` }} />
      ))}
    </GridContainer>
  );
};
