import { Container } from "@components/LandingPage/Base/Container";
import { Layouts } from "@components/LandingPage/Base/Layouts";
import { ContainerRenderEditorFreeform } from "@components/LandingPage/PageBuilder/RenderEditor/Freeform";
import { ContainerHeader } from "@components/LandingPage/PageBuilder/ContainerHeader";
import { ContainerImportBlock } from "@components/LandingPage/PageBuilder/Import";
import { Grid } from "@components/LandingPage/PageBuilder/Grid";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DndContext, PointerSensor, useSensor, useSensors, useDraggable, closestCenter } from "@dnd-kit/core";
import _ from "lodash";
import { setFreeformBlocks } from "@redux/reducers/freeformBlocks.reducers";
import { ContainerCustomizeBlock } from "@components/LandingPage/PageBuilder/Customize";
import { ColorPicker } from "@components/LandingPage/Base/ColorPicker";
import { useForm } from "react-hook-form";
import { Slide } from "@components/LandingPage/Base/Slide";
import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";
import { LOREM_IPSUM } from "statics/LOREM_IPSUM";

export default () => {
  const dispatch = useDispatch();
  const { ref: containerRef } = useContainerDimensionContext();
  console.log("containerRef :>> ", containerRef);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);
  const customizeBackground = useSelector((state) => state?.customizeBackground?.data, shallowEqual);

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
      // x: snapToGrid(currentAttr.x + delta.x, containerWidth),
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

  const {
    control,
    formState: { errors },
  } = useForm({});

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
        {/* FREEFORM */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleFreeformDragStart}
          onDragEnd={handleFreeformDragEnd}
          onDragCancel={handleFreeformDragCancel}
        >
          <ContainerRenderEditorFreeform />
        </DndContext>
        <div>{LOREM_IPSUM}</div>
        <div>{LOREM_IPSUM}</div>

        {/* FREEFORM */}
      </Container>
    </Layouts>
  );
};
