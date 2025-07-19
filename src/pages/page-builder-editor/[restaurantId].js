import { Layout } from "@components/Base/Layout";
import { Modal } from "@components/Base/Modal";
import { ContainerEditorMenu } from "@components/Editor/ContainerEditorMenu";
import { ContainerFreeformBlocks } from "@components/Editor/ContainerFreeformBlocks";
import { ImportFreeformBlock } from "@components/Editor/ModalForm/ImportFreeformBlock";
import _ from "lodash";
import React, { useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { DndContext, PointerSensor, useSensor, useSensors, useDraggable, closestCenter } from "@dnd-kit/core";
import { setFreeformBlocks } from "@redux/reducers/editor/freeformBlocks.reducers";
import { Container } from "@components/Editor/Container";
import { Text } from "@components/Base/Text";
import { LOREM_IPSUM } from "statics/LOREM_IPSUM";
import { useContainerDimensions } from "@hooks/useContainerDimensions";

export default () => {
  const { width: containerWidth, height: containerHeight, ref: containerRef } = useContainerDimensions();

  const dispatch = useDispatch();
  const modalAttribute = useSelector((state) => state?.modalAttribute?.data, shallowEqual);
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);

  console.log("containerRef :>> ", containerRef);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const handleFreeformDragEnd = (event) => {
    const { active, delta } = event;
    const container = containerRef.current;
    console.log("container :>> ", container);
    if (!container) return;

    const newBlocks = _.map(freeformBlocks, (item) => {
      const itemId = _.get(item, ["id"]);
      const activeId = _.get(active, ["id"]);
      if (itemId !== activeId) {
        return item;
      }

      const x = _.get(item, ["attribute", "x"]);
      const y = _.get(item, ["attribute", "y"]);
      const width = _.get(item, ["attribute", "width"]);
      const height = _.get(item, ["attribute", "height"]);

      const newX = (x || 0) + delta?.x;
      const newY = (y || 0) + delta?.y;

      return {
        ...item,
        attribute: {
          ...item?.attribute,
          x: Math.max(width, Math.min(newX, containerWidth)),
          y: Math.max(height, Math.min(newY, containerHeight)),
        },
      };
    });
    console.log("newBlocks :>> ", newBlocks);
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
      <ContainerEditorMenu />
      <Container ref={containerRef} id="editor-container">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleFreeformDragStart}
          onDragEnd={handleFreeformDragEnd}
          onDragCancel={handleFreeformDragCancel}
        >
          {_.map(freeformBlocks, (item) => {
            const id = _.get(item, ["id"]);
            return (
              <ContainerFreeformBlocks
                key={id}
                $item={item}
                $containerWidth={containerWidth}
                $containerHeight={containerHeight}
              />
            );
          })}
        </DndContext>
      </Container>

      <Modal>
        {_.get(modalAttribute, ["type"]) === "import-freeform-block" && (
          <ImportFreeformBlock $containerWidth={containerWidth} $containerHeight={containerHeight} />
        )}
      </Modal>
    </Layout>
  );
};
