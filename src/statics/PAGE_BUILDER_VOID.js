export const COLUMN_HEIGHT_OPTIONS_RANGE = {
  DESKTOP: { min: 50, max: 480, default: 200 },
  MOBILE: { min: 50, max: 360, default: 100 },
};

export const ASPECT_RATIO_LIST = [
  { label: "no fixed ratio", value: null },
  { label: "1:1", value: 1 / 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "2:1", value: 2 / 1 },
  { label: "3:4", value: 3 / 4 },
  { label: "9:16", value: 9 / 16 },
];

export const COLUMN_ITEM_RADIUS_LIMIT = {
  min: 0,
  max: 150,
};

export const ALIGN_CONTENT_OPTIONS = [
  { label: "start", value: "flex-start" },
  { label: "center", value: "center" },
  { label: "end", value: "flex-end" },
];
