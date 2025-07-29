import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import ContainerDimensionContext from "./ContainerDimensionContext";

export const DESIGN_SIZE = {
  DESKTOP: 1024,
  MOBILE: 425,
};

export const ContainerDimensionProvider = ({ children }) => {
  const ref = useRef(null);
  const [containerWidth, setContainerWidth] = useState(DESIGN_SIZE.DESKTOP);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  let device = "DESKTOP";
  if (containerWidth < DESIGN_SIZE.TABLET) {
    device = "MOBILE";
  } else if (containerWidth < DESIGN_SIZE.DESKTOP) {
    device = "TABLET";
  }
  const scale = containerWidth / _.get(DESIGN_SIZE, [device], DESIGN_SIZE?.MOBILE);

  return (
    <ContainerDimensionContext.Provider
      value={{
        containerWidth,
        ref,
        device,
        scale,
      }}
    >
      {children}
    </ContainerDimensionContext.Provider>
  );
};
