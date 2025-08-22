// hooks/useContainerAttribute.js
import { getAngleFromAspectRatio } from "@utils/getAngleFromAspectRatio";
import { useEffect, useRef, useState } from "react";

export const useContainerAttribute = () => {
  const containerRef = useRef(null);
  const [containerAttribute, setContainerAttribute] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect || {};
      setContainerAttribute({
        width,
        height,
        aspectRatio: width / height,
        angle: getAngleFromAspectRatio(width / height),
      });
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { containerRef, containerAttribute };
};
