// import _ from "lodash";
// import React from "react";
// import styled from "styled-components";
// import { Text } from "@components/LandingPage/Base/Text";
// import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
// import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";
// import { resolveItemAttribute } from "@utils/resolve/resolveItemAttribute";
// import { resolveScaleSize } from "@utils/resolve/resolveScaleSize";

// const Container = styled.div`
//   position: absolute;
//   user-select: none;
//   touch-action: none;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   left: ${({ $x }) => `${$x}px`};
//   top: ${({ $y }) => `${$y}px`};
//   border-color: ${({ $isActive = false }) =>
//     $isActive ? MAIN_COLORS?.MAIN?.BLOCK_ACTIVE : MAIN_COLORS?.MAIN?.BLOCK_INACTIVE};
//   border-width: 2px;
//   border-style: dotted;
//   border-radius: 4px;
//   overflow: hidden;
//   z-index: 2;
// `;

// export const RenderViewTextFreeform = ({ $item }) => {
//   const { device, scale } = useContainerDimensionContext();

//   const value = _.get($item, ["value"]);
//   const color = _.get($item, ["color"]);
//   const fontWeight = _.get($item, ["fontWeight"]);
//   const fontFamily = _.get($item, ["fontFamily"]);

//   const attribute = resolveItemAttribute({ item: $item, device });
//   const y = _.get(attribute, ["y"]);
//   const x = resolveScaleSize({ size: _.get(attribute, ["x"]), scale });
//   const fontSize = resolveScaleSize({ size: _.get(attribute, ["fontSize"]), scale });

//   return (
//     <Container $x={x} $y={y}>
//       <Text $fontFamily={fontFamily} $fontWeight={fontWeight} $color={color} $fontSize={fontSize}>
//         {_.isEmpty(value) ? "Click Me To Edit" : value}
//       </Text>
//     </Container>
//   );
// };

import _ from "lodash";
import React from "react";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setImportBlockAttr } from "@redux/reducers/importBlockAttr.reducers";
import { Text } from "@components/LandingPage/Base/Text";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { useContainerDimensionContext } from "@contexts/containerDimension/ContainerDimensionContext";
import { resolveScaleSize } from "@utils/resolve/resolveScaleSize";

const Container = styled.div`
  position: absolute;
  user-select: none;
  touch-action: none;
  display: flex;
  justify-content: center;
  align-items: center;

  left: ${({ $x }) => `${$x}px`};
  top: ${({ $y }) => `${$y}px`};

  transform: ${({ $transform }) => $transform || "none"};

  overflow: hidden;
  z-index: 2;
  box-sizing: border-box;
`;

export const RenderViewTextFreeform = ({ $item }) => {
  const { scale } = useContainerDimensionContext();

  const id = _.get($item, ["id"]);
  const value = _.get($item, ["value"]);
  const color = _.get($item, ["color"]);
  const fontWeight = _.get($item, ["fontWeight"]);
  const fontFamily = _.get($item, ["fontFamily"]);
  const textAlign = _.get($item, ["textAlign"]);

  const x = resolveScaleSize({ size: _.get($item, ["x"]), scale });
  const y = _.get($item, ["y"]);
  const fontSize = resolveScaleSize({ size: _.get($item, ["fontSize"]), scale });

  return (
    <Container id={id} $x={x} $y={y}>
      <Text
        style={{ whiteSpace: "pre" }}
        $ellipsis={false}
        $fontFamily={fontFamily}
        $fontWeight={fontWeight}
        $color={color}
        $fontSize={fontSize}
        $align={textAlign}
      >
        {value}
      </Text>
    </Container>
  );
};
