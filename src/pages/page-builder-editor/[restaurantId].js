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
import { useContainerDimensions } from "@hooks/useContainerDimensions";
import { Grid } from "@components/Editor/Grid";
import { fitPxW } from "@utils/resolve/resolveSize";
import { SettingFreeformAttributeText } from "@components/Editor/ModalForm/Freeform/SettingFreeformAttributeText";

export default () => {
  const { width: containerWidth, height: containerHeight, ref: containerRef } = useContainerDimensions();

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

    const newBlocks = _.map(freeformBlocks, (item) => {
      const itemId = _.get(item, ["id"]);
      const activeId = _.get(active, ["id"]);
      if (itemId !== activeId) {
        return item;
      }

      const x = _.get(item, ["x"]);
      const y = _.get(item, ["y"]);
      const scale = fitPxW({ containerWidth });

      const deltaDesignX = delta.x / scale;
      const deltaDesignY = delta.y;

      const newX = x + deltaDesignX;
      const newY = y + deltaDesignY;

      return {
        ...item,
        x: newX,
        y: newY,
        attribute: {
          ...item?.attribute,
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
        <Grid $containerWidth={containerWidth} $containerHeight={containerHeight} />
      </Container>

      <Modal>
        {_.get(modalAttribute, ["type"]) === "import-freeform-block" && (
          <ImportFreeformBlock $containerWidth={containerWidth} $containerHeight={containerHeight} />
        )}
        {_.get(modalAttribute, ["type"]) === "setting-freeform-text" && (
          <SettingFreeformAttributeText $containerWidth={containerWidth} $containerHeight={containerHeight} />
        )}
      </Modal>
    </Layout>
  );
};
