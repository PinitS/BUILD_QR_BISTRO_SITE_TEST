import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

export const Text = styled.span.attrs(({ $ellipsis = true, $maxLines = 1 }) => ({
  $ellipsis,
  $maxLines,
}))`
  color: ${({ $color = MAIN_COLORS?.MAIN?.TEXT_COLOR }) => $color};
  font-family: ${({ $fontFamily = "Sen" }) => $fontFamily};
  font-weight: ${({ $fontWeight = 400 }) => Number($fontWeight)};

  font-size: ${({ $fontSize = 16 }) => (typeof $fontSize === "number" ? `${$fontSize}px` : $fontSize)};

  opacity: ${({ $disabled, $opacity = 1 }) => ($disabled ? 0.5 : $opacity)};
  width: ${({ $width = "auto" }) => (typeof $width === "number" ? `${$width}px` : $width)};

  text-decoration-line: ${({ $decorationLine = "none" }) => $decorationLine};
  text-transform: ${({ $textTransform = "none" }) => $textTransform};
  text-align: ${({ $align = "left" }) => $align};

  margin-top: ${({ $mt = 0 }) => `${$mt}px`};
  margin-bottom: ${({ $mb = 0 }) => `${$mb}px`};
  margin-left: ${({ $ml = 0 }) => `${$ml}px`};
  margin-right: ${({ $mr = 0 }) => `${$mr}px`};

  padding-top: ${({ $pt = 0 }) => `${$pt}px`};
  padding-bottom: ${({ $pb = 0 }) => `${$pb}px`};
  padding-left: ${({ $pl = 0 }) => `${$pl}px`};
  padding-right: ${({ $pr = 0 }) => `${$pr}px`};

  white-space: pre-line;
  text-overflow: unset;
  word-break: break-all;
  overflow-wrap: normal;

  ${({ $ellipsis, $maxLines }) =>
    $ellipsis
      ? `
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${$maxLines};
    -webkit-box-orient: vertical;
    white-space: nowrap;
    word-break: break-word;
    overflow-wrap: break-word;
  `
      : ""}
`;
