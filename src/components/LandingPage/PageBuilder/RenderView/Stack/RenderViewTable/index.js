import { Text } from "@components/LandingPage/Base/Text";
import _ from "lodash";
import { TABLE_DATA } from "mocks/TABLE_DATA";
import { useMemo, useState } from "react";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  max-height: 420px;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #eee;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const OuterScrollContainer = styled.div`
  overflow-x: auto;
  flex: 1;
`;

const InnerTable = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: 100%;
`;

const ScrollableRows = styled.div`
  overflow-y: auto;
  max-height: 320px;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns};
  padding: 12px;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  font-weight: bold;
  gap: 12px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns};
  padding: 12px;
  background: #fff;
  border-bottom: 1px solid #eee;
  gap: 12px;
  align-items: center;

  &:nth-child(even) {
    background: #f9fafb;
  }
`;

const ContainerNoDataAvailable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 320px;
  padding: 32px;
  text-align: center;
  color: #999;
`;

const PaginationContainer = styled.div`
  padding: 12px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  border: none;
  background: ${({ disabled }) => (disabled ? "#ddd" : "#1d4ed8")};
  color: white;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const RenderViewTable = ({ $item }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const data = _.get($item, ["data"], TABLE_DATA);
  const pageSize = _.get($item, ["pageSize"], 10);
  const columnTemplate = _.get($item, ["columnTemplate"], "500px 500px 500px 500px 500px");

  const hasData = _.isArray(data) && !_.isEmpty(data);
  const headers = hasData ? _.keys(_.first(data)) : [];
  const totalPages = hasData ? Math.ceil(_.size(data) / pageSize) : 1;

  const paginatedData = useMemo(() => {
    if (!hasData) return [];
    const startIndex = (currentPage - 1) * pageSize;
    return _.slice(data, startIndex, startIndex + pageSize);
  }, [hasData, data, currentPage, pageSize]);

  if (!hasData) {
    return (
      <Container>
        <ContainerNoDataAvailable>
          <Text $color={MAIN_COLORS?.INPUT}>No data</Text>
        </ContainerNoDataAvailable>
      </Container>
    );
  }

  return (
    <Container>
      {/* ✅ แนวนอน scroll ได้ทั้ง header และ row */}
      <OuterScrollContainer>
        <InnerTable>
          <TableHeader $columns={columnTemplate}>
            {headers.map((header) => (
              <div key={header}>{header}</div>
            ))}
          </TableHeader>

          <ScrollableRows>
            {paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex} $columns={columnTemplate}>
                {headers.map((header) => (
                  <div key={header}>{row[header]}</div>
                ))}
              </TableRow>
            ))}
          </ScrollableRows>
        </InnerTable>
      </OuterScrollContainer>

      {/* Pagination */}
      <PaginationContainer>
        <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          Previous
        </PageButton>
        <div>
          หน้า {currentPage} / {totalPages}
        </div>
        <PageButton disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next
        </PageButton>
      </PaginationContainer>
    </Container>
  );
};
