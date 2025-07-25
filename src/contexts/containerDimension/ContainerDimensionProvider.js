import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import ContainerDimensionContext from "./ContainerDimensionContext";

export const DESIGN_SIZE = {
  DESKTOP: 1024,
  TABLET: 768,
  MOBILE: 425,
};

export const ContainerDimensionProvider = ({ children }) => {
  const ref = useRef(null);
  const [containerWidth, setContainerWidth] = useState(DESIGN_SIZE.DESKTOP);

  const updateSize = () => {
    if (typeof window === "undefined" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setContainerWidth(rect.width);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    updateSize();
    const handleResize = _.debounce(updateSize, 100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let device = "DESKTOP";
  if (containerWidth < DESIGN_SIZE.TABLET) {
    device = "MOBILE";
  } else if (containerWidth < DESIGN_SIZE.DESKTOP) {
    device = "TABLET";
  }
  const scale = containerWidth / DESIGN_SIZE[device];

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
