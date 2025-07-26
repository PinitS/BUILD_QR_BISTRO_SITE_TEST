export const snapToGrid = (valuePx, containerWidth, numColumns = 24) => {
  const columnWidthPx = containerWidth / numColumns;
  const columnIndex = Math.round(valuePx / columnWidthPx);
  return columnIndex * columnWidthPx;
};
