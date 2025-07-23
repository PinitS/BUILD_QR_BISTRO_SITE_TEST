import styled, { css } from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: ${({ $justifyContent = "center" }) => $justifyContent};
  align-items: ${({ $alignItems = "center" }) => $alignItems};
  flex-direction: ${({ $flexDirection = "row" }) => $flexDirection};
  gap: ${({ $gap = 0 }) => `${$gap}px`};

  width: ${({ $width = "auto" }) => (typeof $width === "number" ? `${$width}px` : $width)};
  height: ${({ $height = "auto" }) => (typeof $height === "number" ? `${$height}px` : $height)};

  ${({ $isSquare }) =>
    $isSquare &&
    css`
      aspect-ratio: 1 / 1;
    `}

  margin-top: ${({ $mt = 0 }) => `${$mt}px`};
  margin-bottom: ${({ $mb = 0 }) => `${$mb}px`};
  margin-left: ${({ $ml = 0 }) => `${$ml}px`};
  margin-right: ${({ $mr = 0 }) => `${$mr}px`};

  padding-top: ${({ $pt = 0 }) => `${$pt}px`};
  padding-bottom: ${({ $pb = 0 }) => `${$pb}px`};
  padding-left: ${({ $pl = 0 }) => `${$pl}px`};
  padding-right: ${({ $pr = 0 }) => `${$pr}px`};

  border-width: ${({ $borderWidth = 1 }) => `${$borderWidth}px`};
  border-style: ${({ $borderStyle = "solid" }) => $borderStyle};
  border-radius: ${({ $borderRadius = 0 }) => `${$borderRadius}px`};

  opacity: ${({ $opacity = 1, disabled }) => (disabled ? 0.5 : $opacity)};

  border-color: ${({ $borderColor = "transparent" }) => $borderColor};
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};

  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
