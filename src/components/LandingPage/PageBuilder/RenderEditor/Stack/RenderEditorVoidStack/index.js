import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: ${({ $direction = "center" }) => $direction};
  justify-content: ${({ $justifyContent = "center" }) => $justifyContent};
  align-items: ${({ $alignItems = "center" }) => $alignItems};
  gap: ${({ $spacing = 0 }) => $spacing}px;
  width: 100%;
  height: auto;
  padding-top: ${({ $paddingVertical = 0 }) => $paddingVertical}px;
  padding-bottom: ${({ $paddingVertical = 0 }) => $paddingVertical}px;

  padding-left: ${({ $paddingHorizontal = 0 }) => $paddingHorizontal}px;
  padding-right: ${({ $paddingHorizontal = 0 }) => $paddingHorizontal}px;

  border-width: 1px;
  border-style: dashed;
  border-color: ${({ $isActive = false }) =>
    $isActive ? MAIN_COLORS?.MAIN?.BLOCK_ACTIVE : MAIN_COLORS?.MAIN?.BLOCK_INACTIVE};
  flex-shrink: 0;
  overflow: hidden;
  box-sizing: border-box;
`;

export const RenderEditorVoidStack = ({ $item }) => {
  const dispatch = useDispatch();
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const importBlockAttr = useSelector((state) => state?.importBlockAttr?.data, shallowEqual);

  const id = _.get($item, ["id"]);

  const attribute = _.get($item, ["attribute", selectedLayoutDesign]);
  const spacing = _.get(attribute, ["spacing"]);
  const direction = _.get(attribute, ["direction"]);
  const alignItems = _.get(attribute, ["alignItems"]);
  const justifyContent = _.get(attribute, ["justifyContent"]);
  const paddingHorizontal = _.get(attribute, ["paddingHorizontal"]);
  const paddingVertical = _.get(attribute, ["paddingVertical"]);
  const columns = _.get(attribute, ["columns"]);

  const isActive = _.get(customizeBlockAttr, ["id"]) === id && _.get(customizeBlockAttr, ["isVisible"]);

  const handleSelectMainVoidBlock = () => {
    const updateSelectedStackBlock = isActive
      ? { ...customizeBlockAttr, isVisible: false }
      : { isVisible: true, id, form: "CUSTOMIZE-STACK-VOID" };
    batch(() => {
      dispatch(setCustomizeBlockAttr(updateSelectedStackBlock));
      dispatch(setImportBlockAttr({ ...importBlockAttr, isVisible: false }));
    });
  };

  return (
    <Container
      onClick={() => handleSelectMainVoidBlock()}
      $spacing={spacing}
      $direction={direction}
      $alignItems={alignItems}
      $justifyContent={justifyContent}
      $paddingHorizontal={paddingHorizontal}
      $paddingVertical={paddingVertical}
      $isActive={isActive}
    >
      {_.map(columns, (colItem, colIndex) => {
        // console.log("colIndex :>> ", colIndex);
        // console.log("colItem :>> ", colItem);
        return (
          <div
            key={colIndex}
            style={{
              width: "100%",
              height: colIndex === "LEFT" ? 200 : 100,
              backgroundColor: colIndex === "LEFT" ? "red" : "green",
            }}
          />
        );
      })}
    </Container>
  );
};
