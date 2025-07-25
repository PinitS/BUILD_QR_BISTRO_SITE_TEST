import React from "react";
import styled from "styled-components";
import { Button } from "@components/LandingPage/Base/Button";

const Container = styled(Button)`
  width: 100%;
  height: 85px;
  background: white;
  border-radius: 8px;
  padding: 8px;
`;

// "https://d191sdiqrxs6vs.cloudfront.net/e30636f4-5f2c-462d-8cf7-68957fa5df3b/zone-layout/a0c1c79a-2dbb-4d31-aaf6-3df114401f67/649171bd-f390-4ce3-a9b3-7d21c1e68890.webp"

export const UploadFile = ({
  $label = "",
  $setValue = () => undefined,
  $value = null,
  $aspectRatio = 1,
  $radius = 2,
  $allowType = ["png", "jpg", "jpeg"],
}) => {
  console.log("$allowType :>> ", $allowType);
  return <Container>index</Container>;
};
