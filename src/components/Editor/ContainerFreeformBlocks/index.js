import React, { useRef } from "react";
import styled from "styled-components";

import { useDraggable } from "@dnd-kit/core";
import _ from "lodash";

const Container = styled.div`
  position: absolute;
  user-select: none;
  touch-action: none;
  cursor: grab;

  display: flex;
  justify-content: center;
  align-items: center;

  left: ${({ $x, $width }) => `calc(${$x}% - ${$width}px)`};
  top: ${({ $y, $height }) => `calc(${$y}% - ${$height}px)`};

  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};

  transform: ${({ $transform }) => $transform || "none"};
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const ContainerFreeformBlocks = ({ $item, $containerWidth, $containerHeight }) => {
  console.log("$containerWidth :>> ", $containerWidth);
  console.log("$containerHeight :>> ", $containerHeight);
  const ref = useRef(null);
  const id = _.get($item, ["id"]);
  const x = _.get($item, ["x"]); // px
  const y = _.get($item, ["y"]); // px

  const xPercent = (x / $containerWidth) * 100;
  const yPercent = (y / $containerHeight) * 100;
  console.log("$item :>> ", $item);
  console.log("yPercent :>> ", yPercent);
  console.log("xPercent :>> ", xPercent);
  const attribute = _.get($item, ["attribute"]);
  const width = _.get(attribute, ["width"]);
  const height = _.get(attribute, ["height"]);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <Container
      ref={(el) => {
        setNodeRef(el);
        ref.current = el;
      }}
      {...listeners}
      {...attributes}
      $x={xPercent}
      $y={yPercent}
      $width={width}
      $height={height}
      $transform={transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined}
    >
      index
    </Container>
  );
};
