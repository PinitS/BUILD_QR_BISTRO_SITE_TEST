import { Container } from "@components/LandingPage/Base/Container";
import { Layouts } from "@components/LandingPage/Base/Layouts";
import { ContainerRenderEditorFreeform } from "@components/LandingPage/PageBuilder/RenderEditor/Freeform";
import { ContainerHeader } from "@components/LandingPage/PageBuilder/ContainerHeader";
import { ContainerImportBlock } from "@components/LandingPage/PageBuilder/Import";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DndContext, PointerSensor, useSensor, useSensors, useDraggable, closestCenter } from "@dnd-kit/core";
import _ from "lodash";
import { setFreeformBlocks } from "@redux/reducers/freeformBlocks.reducers";
import { ContainerCustomizeBlock } from "@components/LandingPage/PageBuilder/Customize";
import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";
import { getBoundingRectById } from "@utils/getBoundingRectById";
import { ContainerRenderEditorStack } from "@components/LandingPage/PageBuilder/RenderEditor/Stack";

export default () => {
  const dispatch = useDispatch();
  const { ref: containerRef, containerWidth } = useContainerDimensionContext();
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);
  const customizeBackground = useSelector((state) => state?.customizeBackground?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const handleFreeformDragEnd = (event) => {
    const { active, delta } = event;
    const activeId = _.get(active, ["id"]);
    const { elWidth } = getBoundingRectById({ id: activeId });

    const activeIndex = _.chain(freeformBlocks)
      .get([selectedLayoutDesign])
      .findIndex((item) => {
        return _.get(item, ["id"]) === activeId;
      })
      .value();

    if (activeIndex === -1) {
      return;
    }

    // UPDATE STATE
    const updatedFreeformBlocks = {
      ...freeformBlocks,
      [selectedLayoutDesign]: [...freeformBlocks[selectedLayoutDesign]],
    };

    const currentFreeformBlockItem = _.get(freeformBlocks, [selectedLayoutDesign, activeIndex]);

    const newX = Math.max(0, Math.min(currentFreeformBlockItem.x + delta.x, containerWidth - elWidth));
    const newY = Math.max(0, currentFreeformBlockItem.y + delta.y);

    const updatedFreeformBlockItem = {
      ...currentFreeformBlockItem,
      x: newX,
      y: newY,
    };
    updatedFreeformBlocks[selectedLayoutDesign][activeIndex] = updatedFreeformBlockItem;
    dispatch(setFreeformBlocks(updatedFreeformBlocks));
    // UPDATE STATE

    if (containerRef?.current) {
      containerRef.current.style.overflowY = "scroll";
      containerRef.current.style.overflowX = "hidden";
    }
  };

  const handleFreeformDragStart = () => {
    document.body.classList.add("dragging");
    if (containerRef?.current) {
      containerRef.current.style.overflow = "hidden";
    }
  };

  const handleFreeformDragCancel = () => {
    document.body.classList.remove("dragging");
    if (containerRef?.current) {
      containerRef.current.style.overflowY = "scroll";
      containerRef.current.style.overflowX = "hidden";
    }
  };

  return (
    <Layouts
      $backgroundColor={_.get(customizeBackground, ["bodyBackgroundColor"])}
      $backgroundImage={_.get(customizeBackground, ["bodyBackgroundImage"])}
    >
      <ContainerHeader />
      <ContainerImportBlock />
      <ContainerCustomizeBlock />

      <Container
        ref={containerRef}
        $backgroundColor={_.get(customizeBackground, ["containerBackgroundColor"])}
        $containerBackgroundOpacity={_.get(customizeBackground, ["containerBackgroundOpacity"])}
        $layoutDesign={selectedLayoutDesign}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleFreeformDragStart}
          onDragEnd={handleFreeformDragEnd}
          onDragCancel={handleFreeformDragCancel}
        >
          <ContainerRenderEditorFreeform />
        </DndContext>

        <ContainerRenderEditorStack />
      </Container>
    </Layouts>
  );
};
