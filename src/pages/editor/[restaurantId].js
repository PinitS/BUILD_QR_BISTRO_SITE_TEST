"use client";
import dynamic from "next/dynamic";
import { Container } from "@components/LandingPage/Base/Container";
import { Layouts } from "@components/LandingPage/Base/Layouts";
import { ContainerRenderEditorFreeform } from "@components/LandingPage/PageBuilder/RenderEditor/Freeform";
import { ContainerHeader } from "@components/LandingPage/PageBuilder/ContainerHeader";
import { ContainerImportBlock } from "@components/LandingPage/PageBuilder/Import";
import React, { useEffect } from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { DndContext, PointerSensor, useSensor, useSensors, useDraggable, closestCenter } from "@dnd-kit/core";
import _ from "lodash";
import { setFreeformBlocks } from "@redux/reducers/freeformBlocks.reducers";
import { ContainerCustomizeBlock } from "@components/LandingPage/PageBuilder/Customize";
import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";
import { getBoundingRectById } from "@utils/getBoundingRectById";
import { ContainerRenderEditorStack } from "@components/LandingPage/PageBuilder/RenderEditor/Stack";
import { AnimationBackground } from "@components/LandingPage/PageBuilder/RenderEditor/AnimationBackground";
import { useParams } from "next/navigation";
import { httpRequest } from "@helpers/http/httpRequest";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import { setCustomizeBackground } from "@redux/reducers/customizeBackground.reducers";

const EditorPage = () => {
  const params = useParams();
  const restaurantId = _.get(params, ["restaurantId"]);

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

    const currentFreeformBlockItem = _.get(freeformBlocks, [selectedLayoutDesign, activeIndex]);

    const newX = Math.max(0, Math.min(currentFreeformBlockItem.x + delta.x, containerWidth - elWidth));
    const newY = Math.max(0, currentFreeformBlockItem.y + delta.y);

    const updateBlockItem = {
      ...currentFreeformBlockItem,
      x: newX,
      y: newY,
    };

    const updateBlocks = _.chain(freeformBlocks)
      .cloneDeep()
      .set([selectedLayoutDesign, activeIndex], updateBlockItem)
      .value();

    dispatch(setFreeformBlocks(updateBlocks));
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

  // initial

  const initial = async () => {
    console.log("restaurantId :>> ", restaurantId);

    try {
      const resp = await httpRequest({
        path: "/restaurant/landing-page/get-draft",
        data: { restaurantId },
      });

      const result = _.get(resp, ["result"]);
      const landingPage = _.get(result, ["landingPage"]);
      const freeformBlocks = _.get(landingPage, ["freeformBlocks"]);
      const stackBlocks = _.get(landingPage, ["stackBlocks"]);
      const background = _.get(landingPage, ["background"]);

      batch(() => {
        dispatch(setCustomizeBackground(background));
        dispatch(setFreeformBlocks(freeformBlocks));
        dispatch(setStackBlocks(stackBlocks));
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    if (!restaurantId) {
      return;
    }

    initial();
  }, [restaurantId]);

  return (
    <Layouts
      $backgroundColor={_.get(customizeBackground, ["bodyBackgroundColor"])}
      $backgroundImage={_.get(customizeBackground, ["bodyBackgroundImage"])}
    >
      <AnimationBackground $customizeBackground={customizeBackground} />
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

// eslint-disable-next-line no-undef
export default dynamic(() => Promise.resolve(EditorPage), { ssr: false });
