import styled from "styled-components";

export const Layouts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
  background-image: ${({ $backgroundImage }) => ($backgroundImage ? `url(${$backgroundImage})` : "none")};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
