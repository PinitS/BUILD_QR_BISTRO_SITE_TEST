import React from "react";
import styled from "styled-components";
import { Button } from "@components/LandingPage/Base/Button";

const Container = styled(Button)`
  width: 100%;
  height: 85px;
  background: white;
  border-radius: 8px;
`;
export const UploadFile = ({
  $label = "",
  $setValue = () => undefined,
  $allowType = ["png", "jpg", "jpeg"],
}) => {
  console.log("$allowType :>> ", $allowType);
  return <Container>index</Container>;
};
