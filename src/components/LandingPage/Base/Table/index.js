import styled from "styled-components";

const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns = "1fr 1fr" }) => $columns};
  padding-top: ${({ $paddingTop = 8 }) => $paddingTop}px;
  padding-bottom: ${({ $paddingBottom = 8 }) => $paddingBottom}px;
  padding-left: ${({ $paddingLeft = 12 }) => $paddingLeft}px;
  padding-right: ${({ $paddingRight = 12 }) => $paddingRight}px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${({ $borderColor = "#eee" }) => $borderColor};
  background: ${({ $backgroundColor = "#fafafa" }) => $backgroundColor};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  gap: 12px;
  align-items: center;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns = "1fr 1fr" }) => $columns};
  padding-top: ${({ $paddingTop = 8 }) => $paddingTop}px;
  padding-bottom: ${({ $paddingBottom = 8 }) => $paddingBottom}px;
  padding-left: ${({ $paddingLeft = 12 }) => $paddingLeft}px;
  padding-right: ${({ $paddingRight = 12 }) => $paddingRight}px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${({ $borderColor = "#eee" }) => $borderColor};
  background: ${({ $backgroundColor = "#fff" }) => $backgroundColor};
  gap: 12px;
  align-items: center;
`;

const ContainerNoDataAvailable = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #fafafa;
  border-radius: 12px;
`;
