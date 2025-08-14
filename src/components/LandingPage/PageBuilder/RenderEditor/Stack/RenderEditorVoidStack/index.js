import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import { setSelectedStackBlockColumnItem } from "@redux/reducers/selectedStackBlockColumnItem.reducers";
import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import { ContainerEmpty } from "./ContainerEmpty";
import { Text } from "@components/LandingPage/Base/Text";
import { ContainerText } from "./ContainerText";
import { ContainerImage } from "./ContainerImage";

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

const ContainerItem = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: ${({ $height = "auto" }) => (typeof $height === "number" ? `${$height}px` : $height)};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  overflow: hidden;
  box-sizing: border-box;
  border-radius: ${({ $radius }) => $radius}px;
`;

const ContainerActive = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 2px;
  padding-bottom: 2px;
  background: ${MAIN_COLORS?.MAIN?.BLOCK_ACTIVE};
  border-radius: 4px;
`;

export const RenderEditorVoidStack = ({ $item }) => {
  const dispatch = useDispatch();
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const importBlockAttr = useSelector((state) => state?.importBlockAttr?.data, shallowEqual);
  const selectedStackBlockColumnItem = useSelector(
    (state) => state?.selectedStackBlockColumnItem?.data,
    shallowEqual,
  );

  const id = _.get($item, ["id"]);

  const columns = _.get($item, ["columns"]);
  const columnItems = _.get($item, ["columnItems"]);
  const aspectRatio = _.get($item, ["aspectRatio"]);
  const height = _.get($item, ["height"]);
  const spacing = _.get($item, ["spacing"]);
  const paddingHorizontal = _.get($item, ["paddingHorizontal"]);
  const paddingVertical = _.get($item, ["paddingVertical"]);

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
          const type = _.get(item, ["type"]);
          return (
            <ContainerItem
              onClick={(event) => handleSelectedColumnItem({ columnItemId: id, event })}
              key={index}
              $isActive={isActive}
              $height={_.isNil(aspectRatio) ? height : "auto"}
              $aspectRatio={aspectRatio}
            >
              {(() => {
                switch (type) {
                  case "IMAGE":
                    return (
                      <ContainerImage key={id} $isActive={isActive} $item={item} $aspectRatio={aspectRatio} />
                    );
                  case "TEXT":
                    return <ContainerText key={id} $isActive={isActive} $item={item} />;
                  case "SLIDE":
                    return <div>{"slide"}</div>;

                  default:
                    return <ContainerEmpty key={id} $isActive={isActive} $item={item} />;
                }
              })()}
            </ContainerItem>
          );
        })
        .value()}
    </Container>
  );
};
