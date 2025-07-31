import _ from "lodash";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  width: ${({ $width = 100 }) => $width}%;
  height: ${({ $height = 200 }) => $height}px;
  background: ${({ $backgroundColor = 100 }) => $backgroundColor};
  border-radius: ${({ $borderRadius = 0 }) => $borderRadius};
  border-width: 1px;
  border-style: dashed;
  border-color: ${({ $isActive = false }) =>
    $isActive ? MAIN_COLORS?.MAIN?.BLOCK_ACTIVE : MAIN_COLORS?.MAIN?.BLOCK_INACTIVE};
  flex-shrink: 0;
`;

export const RenderEditorVoidStack = ({ $item }) => {
  const dispatch = useDispatch();
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  // const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);

  const id = _.get($item, ["id"]);
  const attribute = _.get($item, ["attribute", selectedLayoutDesign]);
  console.log("attribute :>> ", attribute);
  const width = _.get(attribute, ["width"]);
  const height = _.get(attribute, ["height"]);
  const backgroundColor = _.get(attribute, ["backgroundColor"]);
  const borderRadius = _.get(attribute, ["borderRadius"]);

  // const isActive = _.get(customizeBlockAttr, ["id"]) === id && _.get(customizeBlockAttr, ["isVisible"]);

  const handleSelectMainVoidBlock = () => {
    // const updateSelectedFreeformBlock = isActive
    //   ? { ...customizeBlockAttr, isVisible: false }
    //   : { isVisible: true, id, form: "CUSTOMIZE-FREEFORM-IMAGE" };
    // batch(() => {
    //   dispatch(setCustomizeBlockAttr(updateSelectedFreeformBlock));
    //   dispatch(setImportBlockAttr({ ...importBlockAttr, isVisible: false }));
    // });
  };

  return (
    <Container
      $width={width}
      $height={height}
      $backgroundColor={backgroundColor}
      $borderRadius={borderRadius}
    ></Container>
  );
};
