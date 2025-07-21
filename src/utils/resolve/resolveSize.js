const DESIGN_WIDTH = 375;
export const fitPxW = ({ containerWidth = 1 }) => {
  const scale = containerWidth / DESIGN_WIDTH;
  return scale || 1;
};
