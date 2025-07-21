import { fitPxW } from "@utils/resolve/resolveSize";

export const initialFreeformTextAttribute = ({ containerWidth }) => {
  const result = { value: null, mh: 12, mv: 4, size: 12 };
  return result;
};

export const initialFreeformImageAttribute = ({ containerWidth }) => {
  const scale = fitPxW({ containerWidth });
  const initialWidth = Math.round(92 * scale);
  const result = { value: null, isSquare: true, width: initialWidth, height: "auto", mt: 0, mv: 0 };
  return result;
};
