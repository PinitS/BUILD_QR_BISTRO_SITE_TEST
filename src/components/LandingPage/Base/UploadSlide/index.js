import React, { useRef } from "react";
import styled from "styled-components";
import { Button } from "@components/LandingPage/Base/Button";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import { Text } from "../Text";
import _ from "lodash";
import { hold } from "@utils/hold";
import Image from "next/image";
import { MAIN_ATTR } from "statics/PAGE_BUILDER_ATTRIBUTE";
import { PlaceHolderImage } from "../Image/PlaceHolderImage";
import SWAP_ARROW from "@assets/svgs/PAGE_BUILDER/SLIDE/SWAP_ARROW.svg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  height: 85px;
  background: white;
  border-radius: 8px;
  padding: 8px;
  flex-shrink: 0;
`;

const PreviewImage = styled.div`
  position: relative;
  height: 100%;
  width: auto;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  background: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: #dedede;
  overflow: hidden;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ContainerButton = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ContainerSwapIndex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
`;

export const UploadSlide = ({
  $setValue = () => undefined,
  $nameValue = "value",
  $value = null,
  $values = [],
  $aspectRatio = 1,
  $index = 0,
  $allowType = [".png", ".jpg", ".jpeg"],
}) => {
  const uploadDisabled = $index === 0 || !_.isNil($values[$index - 1]);
  const hasPrevious = !_.isNil($values[$index - 1]);
  const hasNext = !_.isNil($values[$index + 1]);

  const acceptExtension = _.join($allowType, ",");

  const fileInputRef = useRef(null);

  const handleUploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      await hold({ sec: 0.3 });
      // $setValue($nameValue, URL.createObjectURL(file));

      const url = URL.createObjectURL(file);

      const updateSlideValues = [...$values];
      updateSlideValues[$index] = url;
      $setValue($nameValue, updateSlideValues);
      // API HERE (file)
    }
  };

  const handleSwapSlide = ({ target }) => {
    console.log("target :>> ", target);
    if (target < 0 || target >= $values.length || _.isNil($values[$index]) || _.isNil($values[target])) {
      return;
    }
    const updateSlideValues = [...$values];
    const temp = updateSlideValues[$index];
    updateSlideValues[$index] = updateSlideValues[target];
    updateSlideValues[target] = temp;
    console.log("updateSlideValues :>> ", updateSlideValues);
    $setValue($nameValue, updateSlideValues);
  };

  return (
    <Container>
      <PreviewImage $aspectRatio={$aspectRatio}>
        {_.isNil($value) ? (
          <PlaceHolderImage />
        ) : (
          <Image alt={MAIN_ATTR?.IMAGE_ALT} fill style={{ objectFit: "cover" }} src={$value} />
        )}
      </PreviewImage>
      <ContainerButton>
        <Button
          disabled={!uploadDisabled}
          onClick={() => handleUploadFile()}
          $width={100}
          $height={32}
          $backgroundColor={MAIN_COLORS?.BUTTON?.BACKGROUND}
          $borderRadius={6}
        >
          <Text $fontSize={12} $fontFamily="Sen" $color={MAIN_COLORS?.BUTTON?.TEXT}>
            Upload
          </Text>
        </Button>
        <ContainerSwapIndex>
          <Button
            $isSquare
            $height={24}
            $borderRadius={6}
            disabled={_.isNil($value) || !hasNext}
            onClick={() => handleSwapSlide({ target: $index + 1 })}
          >
            <SWAP_ARROW
              width={24}
              height={24}
              fill={MAIN_COLORS?.BUTTON?.BACKGROUND}
              style={{ transform: "rotate(180deg)" }}
            />
          </Button>
          <Button
            $isSquare
            $height={24}
            $borderRadius={6}
            disabled={_.isNil($value) || !hasPrevious}
            onClick={() => handleSwapSlide({ target: $index - 1 })}
          >
            <SWAP_ARROW width={24} height={24} fill={MAIN_COLORS?.BUTTON?.BACKGROUND} />
          </Button>
        </ContainerSwapIndex>
      </ContainerButton>

      <HiddenInput ref={fileInputRef} type="file" onChange={handleFileChange} accept={acceptExtension} />
    </Container>
  );
};
