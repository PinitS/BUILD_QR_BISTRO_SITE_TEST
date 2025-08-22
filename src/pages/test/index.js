import { Switch } from "@components/LandingPage/Base/Switch";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Layout = styled.div`
  width: 475px;
  height: 100%;
  /* background: green; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2px;
`;

export default () => {
  console.log("data :>> ");

  const {
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test: true,
    },
  });
  return (
    <Layout>
      <Container>
        <Switch $control={control} $name={"test"} />
        {/* <ContainerItem />
        <ContainerItem /> */}
      </Container>
    </Layout>
  );
};
