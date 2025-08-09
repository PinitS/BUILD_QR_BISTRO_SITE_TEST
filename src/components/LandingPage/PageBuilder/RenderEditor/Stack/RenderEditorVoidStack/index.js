import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import { setSelectedStackBlockColumnItem } from "@redux/reducers/selectedStackBlockColumnItem.reducers";
import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns = 1 }) => `repeat(${$columns}, 1fr)`};
  align-items: center;
  justify-content: center;
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
  const selectedStackBlockColumnItem = useSelector(
    (state) => state?.selectedStackBlockColumnItem?.data,
    shallowEqual,
  );

  const id = _.get($item, ["id"]);

  const attribute = _.get($item, ["attribute", selectedLayoutDesign]);
  const columns = _.get(attribute, ["columns"]);
  const columnItems = _.get(attribute, ["columnItems"]);
  const aspectRatio = _.get(attribute, ["aspectRatio"]);
  const height = _.get(attribute, ["height"]);
  const spacing = _.get(attribute, ["spacing"]);
  const paddingHorizontal = _.get(attribute, ["paddingHorizontal"]);
  const paddingVertical = _.get(attribute, ["paddingVertical"]);

  const isActive = _.get(customizeBlockAttr, ["id"]) === id && _.get(customizeBlockAttr, ["isVisible"]);
  const handleSelectMainVoidBlock = () => {
    const updateSelectedStackBlock = isActive
      ? { ...customizeBlockAttr, isVisible: false }
      : { isVisible: true, id, form: "CUSTOMIZE-STACK-VOID" };
    batch(() => {
      dispatch(setSelectedStackBlockColumnItem(null));
      dispatch(setCustomizeBlockAttr(updateSelectedStackBlock));
      dispatch(setImportBlockAttr({ ...importBlockAttr, isVisible: false }));
    });
  };

  const handleSelectedColumnItem = ({ columnItemId, event }) => {
    // if (customizeBlockAttr?.isVisible) {
    event.stopPropagation();
    const updateSelectedStackBlockColumnItem =
      selectedStackBlockColumnItem === columnItemId ? null : columnItemId;
    batch(() => {
      dispatch(setSelectedStackBlockColumnItem(updateSelectedStackBlockColumnItem));
      dispatch(setCustomizeBlockAttr({ isVisible: true, id, form: "CUSTOMIZE-STACK-VOID" }));
      dispatch(setImportBlockAttr({ ...importBlockAttr, isVisible: false }));
    });
    // }
  };

  return (
    <Container
      onClick={() => handleSelectMainVoidBlock()}
      $spacing={spacing}
      $columns={columns}
      $paddingHorizontal={paddingHorizontal}
      $paddingVertical={paddingVertical}
      $isActive={isActive}
    >
      {_.chain(columnItems)
        .take(columns)
        .map((item, index) => {
          const id = _.get(item, ["id"]);
          const isActive = id === selectedStackBlockColumnItem;
          return (
            <div
              onClick={(event) => handleSelectedColumnItem({ columnItemId: id, event })}
              key={index}
              style={{
                width: "100%",
                height: _.isNil(aspectRatio) ? height : "auto",
                aspectRatio: aspectRatio,
                backgroundColor: isActive ? "red" : "black",
                color: "white",
              }}
            >
              {item?.type}
            </div>
          );
        })
        .value()}
    </Container>
  );
};
