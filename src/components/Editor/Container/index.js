import { EDITOR_DEFAULT_STYLE } from "statics/DEFAULT_STYLE";
import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  position: relative;
  background-color: ${EDITOR_DEFAULT_STYLE?.CONTAINER?.BACKGROUND};
  overflow: hidden;
`;
