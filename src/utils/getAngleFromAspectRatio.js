export const getAngleFromAspectRatio = (aspectRatio) => {
  const radians = Math.atan(1 / aspectRatio);
  return radians * (180 / Math.PI);
};
