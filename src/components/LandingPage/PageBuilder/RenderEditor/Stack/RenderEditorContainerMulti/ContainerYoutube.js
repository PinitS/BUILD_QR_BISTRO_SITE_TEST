import React from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import _ from "lodash";
import ICON_YOUTUBE from "@assets/svgs/PAGE_BUILDER/YOUTUBE/ICON_YOUTUBE.svg";

import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";
import { resolveYoutubeVideoId } from "@utils/resolve/resolveYoutubeVideoId";
import { Text } from "@components/LandingPage/Base/Text";
import { isDarkHex } from "@utils/isDarkHex";
import { useContainerAttribute } from "@hooks/useContainerAttribute";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: ${({ $backgroundColor = "transparent" }) => $backgroundColor};
  border-top-right-radius: ${({ $borderTopRightRadius = 0 }) => $borderTopRightRadius}px;
  border-top-left-radius: ${({ $borderTopLeftRadius = 0 }) => $borderTopLeftRadius}px;
  border-bottom-right-radius: ${({ $borderBottomRightRadius = 0 }) => $borderBottomRightRadius}px;
  border-bottom-left-radius: ${({ $borderBottomLeftRadius = 0 }) => $borderBottomLeftRadius}px;
  overflow: hidden;
  border-width: ${({ $isActive = false }) => ($isActive ? 1 : 0)}px;
  border-style: dashed;
  border-color: ${({ $isActive = false }) => ($isActive ? MAIN_COLORS?.MAIN?.BLOCK_ACTIVE : "transparent")};

  padding-top: ${({ $paddingVertical = 0 }) => $paddingVertical}px;
  padding-bottom: ${({ $paddingVertical = 0 }) => $paddingVertical}px;
  padding-left: ${({ $paddingHorizontal = 0 }) => $paddingHorizontal}px;
  padding-right: ${({ $paddingHorizontal = 0 }) => $paddingHorizontal}px;
`;

export const ContainerYoutube = ({ $item = null, $isActive = false }) => {
  const { containerRef, containerAttribute } = useContainerAttribute();

  const url = _.get($item, ["url"], null);
  const videoId = resolveYoutubeVideoId({ url });

  const isAutoPlay = _.get($item, ["isAutoPlay"]);
  const isMute = _.get($item, ["isMute"]);
  const isLoop = _.get($item, ["isLoop"]);

  const backgroundColor = _.get($item, ["backgroundColor"]);
  const borderTopLeftRadius = _.get($item, ["borderTopLeftRadius"]);
  const borderTopRightRadius = _.get($item, ["borderTopRightRadius"]);
  const borderBottomLeftRadius = _.get($item, ["borderBottomLeftRadius"]);
  const borderBottomRightRadius = _.get($item, ["borderBottomRightRadius"]);
  const paddingHorizontal = _.get($item, ["paddingHorizontal"]);
  const paddingVertical = _.get($item, ["paddingVertical"]);

  return (
    <Container
      ref={containerRef}
      $backgroundColor={backgroundColor}
      $borderTopLeftRadius={borderTopLeftRadius}
      $borderTopRightRadius={borderTopRightRadius}
      $borderBottomLeftRadius={borderBottomLeftRadius}
      $borderBottomRightRadius={borderBottomRightRadius}
      $isActive={$isActive}
      $paddingHorizontal={paddingHorizontal}
      $paddingVertical={paddingVertical}
    >
      {_.isEmpty(url) && (
        <>
          <ICON_YOUTUBE width="50%" height="50%" />
          <Text $fontWeight={400} $color={isDarkHex({ hexColor: backgroundColor }) ? "#FFFFFF" : "#17171B"}>
            Insert YouTube URL
          </Text>
        </>
      )}

      {!_.isEmpty(url) && !videoId && (
        <>
          <ICON_YOUTUBE width="50%" height="50%" />
          <Text $fontWeight={400} $color={isDarkHex({ hexColor: backgroundColor }) ? "#FFFFFF" : "#17171B"}>
            Invalid YouTube URL
          </Text>
        </>
      )}

      {videoId && (
        <YouTube
          style={{ pointerEvents: "none" }}
          key={$item}
          videoId={videoId}
          opts={{
            width: containerAttribute?.width,
            height: containerAttribute?.height,
            playerVars: {
              autoplay: isAutoPlay,
              mute: isMute,
              loop: isLoop,
              playlist: videoId,
            },
          }}
        />
      )}
    </Container>
  );
};
