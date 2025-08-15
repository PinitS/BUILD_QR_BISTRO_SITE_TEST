import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import ContainerDimensionContext from "./ContainerDimensionContext";

export const DESIGN_SIZE = {
  DESKTOP: 1024,
  MOBILE: 425,
};

export const ContainerDimensionProvider = ({ children }) => {
  const ref = useRef(null);
  const [containerAttribute, setContainerAttribute] = useState({
    width: DESIGN_SIZE.DESKTOP,
    height: null,
  });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect || {};
      setContainerAttribute({
        width: width,
        height: height,
      });
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  let device = "DESKTOP";
  if (containerAttribute?.width < DESIGN_SIZE.TABLET) {
    device = "MOBILE";
  } else if (containerAttribute?.width < DESIGN_SIZE.DESKTOP) {
    device = "TABLET";
  }
  const scale = containerAttribute?.width / _.get(DESIGN_SIZE, [device], DESIGN_SIZE?.MOBILE);

  return (
    <ContainerDimensionContext.Provider
      value={{
        ref,
        containerWidth: containerAttribute?.width,
        containerHeight: containerAttribute?.height,
        device,
        scale,
      }}
    >
      {children}
    </ContainerDimensionContext.Provider>
  );
};
