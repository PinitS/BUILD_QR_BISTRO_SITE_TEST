import styled from "styled-components";

export const ImageWrapper = styled.div`
  position: relative;
  width: ${({ $w }) => `${$w}px`};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
`;
