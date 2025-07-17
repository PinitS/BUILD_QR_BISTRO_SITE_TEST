import { Button } from "@components/Base/Button";
import { Container } from "@components/Base/Container";
import { Layout } from "@components/Base/Layout";
import { Modal } from "@components/Base/Modal";
import { ContainerEditorMenu } from "@components/Editor/ContainerEditorMenu";
import { ContainerFreeformBlocks } from "@components/Editor/ContainerFreeformBlocks";
import { ImportFreeformBlock } from "@components/Editor/ModalForm/ImportFreeformBlock";
import { setIsCollapseMenu } from "@redux/reducers/editor/isCollapseMenu.reducers";
import _ from "lodash";
import React, { useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { DndContext, PointerSensor, useSensor, useSensors, useDraggable, closestCenter } from "@dnd-kit/core";
import { setFreeformBlocks } from "@redux/reducers/editor/freeformBlocks.reducers";
import { setStackBlocks } from "@redux/reducers/editor/stackBlocks.reducers";
import { arrayMove } from "@dnd-kit/sortable";
import { Text } from "@components/Base/Text";
import { LOREM_IPSUM } from "statics/LOREM_IPSUM";

export default () => {
  const containerRef = useRef(null);
  const containerRect = containerRef.current?.getBoundingClientRect();
  const containerWidth = containerRect?.width || 1;
  const containerHeight = containerRect?.height || 1;

  const dispatch = useDispatch();
  const modalAttribute = useSelector((state) => state?.modalAttribute?.data, shallowEqual);
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const handleFreeformDragEnd = (event) => {
    const { active, delta } = event;
    const container = containerRef.current;
    if (!container) return;

    const newBlocks = freeformBlocks.map((item) => {
      if (item.id !== active.id) return item;

      return {
        ...item,
        x: item.x + delta.x,
        y: item.y + delta.y,
      };
    });

    dispatch(setFreeformBlocks(newBlocks));
  };

  const handleFreeformDragStart = () => {
    document.body.classList.add("dragging");
  };

  const handleFreeformDragCancel = () => {
    document.body.classList.remove("dragging");
  };

  return (
    <Layout>
      <Container ref={containerRef} id="editor-container">
        <ContainerEditorMenu />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleFreeformDragStart}
          onDragEnd={handleFreeformDragEnd}
          onDragCancel={handleFreeformDragCancel}
        >
          {_.map(freeformBlocks, (item, index) => {
            const key = _.get(item, ["id"]);
            return (
              <ContainerFreeformBlocks
                key={key}
                $item={item}
                $containerWidth={containerWidth}
                $containerHeight={containerHeight}
              />
            );
          })}
        </DndContext>
        <div
          style={{
            background: "red",
            width: 100,
            height: 100,
            position: "absolute",
            top: "0%",
            left: "calc(100% - 100px)",
          }}
        ></div>

        <Modal>
          {_.get(modalAttribute, ["type"]) === "import-freeform-block" && <ImportFreeformBlock />}
        </Modal>
      </Container>
    </Layout>
  );
};
