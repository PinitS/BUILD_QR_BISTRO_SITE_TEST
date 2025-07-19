import { useRef, useState, useEffect } from "react";
import _ from "lodash";

export const useContainerDimensions = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const updateSize = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setSize({
        width: rect.width,
        height: rect.height,
      });
    }
  };

  useEffect(() => {
    updateSize();

    const handleResize = _.debounce(updateSize, 100);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { ...size, ref };
};
