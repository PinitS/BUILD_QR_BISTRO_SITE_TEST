import { Container } from "@components/LandingPage/Base/Container";
import { Layouts } from "@components/LandingPage/Base/Layouts";
import { ContainerHeader } from "@components/LandingPage/PageBuilder/ContainerHeader";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";

export default () => {
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  return (
    <Layouts>
      <ContainerHeader />
      <Container $layoutDesign={selectedLayoutDesign}>{selectedLayoutDesign}</Container>
    </Layouts>
  );
};
