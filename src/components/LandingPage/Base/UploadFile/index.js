import React, { useRef } from "react";
import styled from "styled-components";
import { Button } from "@components/LandingPage/Base/Button";
import { ImageWrapper } from "../Image/ImageWrapper";
import { BlankImagePlaceHolder } from "../Image/BlankImagePlaceHolder";
import { getAngleFromAspectRatio } from "@utils/getAngleFromAspectRatio";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import { Text } from "../Text";
import _ from "lodash";
import { hold } from "@utils/hold";
import Image from "next/image";
import { MAIN_ATTR } from "statics/PAGE_BUILDER_ATTRIBUTE";

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
  border-color: #a6a6a6;
  overflow: hidden;
`;

const HiddenInput = styled.input`
  display: none;
`;

const MOCK_UPLOAD_IMAGE =
  "https://d191sdiqrxs6vs.cloudfront.net/e30636f4-5f2c-462d-8cf7-68957fa5df3b/zone-layout/a0c1c79a-2dbb-4d31-aaf6-3df114401f67/649171bd-f390-4ce3-a9b3-7d21c1e68890.webp";

export const UploadFile = ({
  $label = "",
  $setValue = () => undefined,
  $value = null,
  $aspectRatio = 1,
  $backgroundColor,
  $allowType = [".png", ".jpg", ".jpeg"],
}) => {
  const acceptExtension = _.join($allowType, ",");
  const angle = getAngleFromAspectRatio($aspectRatio);

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
      console.log("file?.blob :>> ", URL.createObjectURL(file));
      $setValue("value", URL.createObjectURL(file));
      // API HERE (file)
    }
  };

  return (
    <Container>
      <PreviewImage $aspectRatio={$aspectRatio}>
        {_.isNil($value) ? (
          <BlankImagePlaceHolder $angle={angle} $fontSize={8} />
        ) : (
          <Image alt={MAIN_ATTR?.IMAGE_ALT} fill style={{ objectFit: "cover" }} src={$value} />
        )}
      </PreviewImage>
      <Button
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

      <HiddenInput ref={fileInputRef} type="file" onChange={handleFileChange} accept={acceptExtension} />
    </Container>
  );
};
