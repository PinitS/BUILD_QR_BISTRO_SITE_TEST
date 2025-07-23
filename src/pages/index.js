import { Container } from "@components/LandingPage/Base/Container";
import { Layouts } from "@components/LandingPage/Base/Layouts";
import { ContainerEditorFreeform } from "@components/LandingPage/Editor/Freeform";
import { ContainerHeader } from "@components/LandingPage/PageBuilder/ContainerHeader";
import { ContainerMainSideMenu } from "@components/LandingPage/PageBuilder/ContainerMainSideMenu";
import { Grid } from "@components/LandingPage/PageBuilder/Grid";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DndContext, PointerSensor, useSensor, useSensors, useDraggable, closestCenter } from "@dnd-kit/core";
import _ from "lodash";
import { setFreeformBlocks } from "@redux/reducers/freeformBlocks.reducers";

export default () => {
  const dispatch = useDispatch();
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const handleFreeformDragEnd = (event) => {
    const { active, delta } = event;
    const activeId = _.get(active, ["id"]);

    const findIndex = _.findIndex(freeformBlocks, (item) => {
      return _.get(item, ["id"]) === activeId;
    });

    if (findIndex === -1) {
      return;
    }

    const updatedBlocks = [...freeformBlocks];
    const updateBlockItem = _.get(freeformBlocks, [findIndex]);
    const currentAttr = _.get(updateBlockItem, ["attribute", selectedLayoutDesign]);

    const updatedAttr = {
      ...currentAttr,
      x: currentAttr.x + delta.x,
      y: currentAttr.y + delta.y,
    };

    const newAttribute = {
      ...updateBlockItem.attribute,
      [selectedLayoutDesign]: updatedAttr,
    };
    updatedBlocks[findIndex] = {
      ...updateBlockItem,
      attribute: newAttribute,
    };

    dispatch(setFreeformBlocks(updatedBlocks));
  };

  const handleFreeformDragStart = () => {
    document.body.classList.add("dragging");
  };

  const handleFreeformDragCancel = () => {
    document.body.classList.remove("dragging");
  };

  return (
    <Layouts>
      <ContainerHeader />
      <ContainerMainSideMenu />
      <Container $layoutDesign={selectedLayoutDesign}>
        {/* FREEFORM */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleFreeformDragStart}
          onDragEnd={handleFreeformDragEnd}
          onDragCancel={handleFreeformDragCancel}
        >
          <ContainerEditorFreeform />
        </DndContext>
        {/* FREEFORM */}
        <Grid />
      </Container>
    </Layouts>
  );
};
