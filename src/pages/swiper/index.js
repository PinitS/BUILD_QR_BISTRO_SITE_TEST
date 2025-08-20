import React from "react";
import styled from "styled-components";
import { DefaultSlide } from "./DefaultSlide";
import { CenterScaleSlide } from "./CenterScaleSlide";
import { FadeEmblaSlide } from "./FadeSlide";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: black;
`;

const SlideContainer = styled.div`
  width: 450px;
  height: 200px;
  background: red;
`;

const images = [
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
];

export default () => {
  return (
    <Container>
      <SlideContainer>
        {/* <DefaultSlide images={images} /> */}
        {/* <CenterScaleSlide images={images} /> */}
        {<FadeEmblaSlide images={images} />}
      </SlideContainer>
    </Container>
  );
};
