export const RESIZE_OPTIONS = [
  { label: "fill", value: "fill" },
  { label: "contain", value: "contain" },
  { label: "cover", value: "cover" },
];

export const ASPECT_RATIO_LIST = [
  { label: "1:1", value: 1 / 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "2:1", value: 2 / 1 },
  { label: "3:4", value: 3 / 4 },
  { label: "9:16", value: 9 / 16 },
];

export const FILTER_LIST = [
  { label: "NONE", value: "none" },
  { label: "NONE", value: "none" },
  { label: "NONE", value: "none" },
  { label: "NONE", value: "none" },
  { label: "NONE", value: "none" },
];

export const FILTER_OPTIONS = [
  { label: "None", value: "NONE" },
  { label: "Grayscale", value: "GRAYSCALE" },
  { label: "Brightness", value: "BRIGHTNESS" },
  { label: "Contrast", value: "CONTRAST" },
  { label: "Saturate", value: "SATURATE" },
  { label: "Sepia", value: "SEPIA" },
  { label: "Hue Rotate", value: "HUE_ROTATE" },
  { label: "Blur", value: "BLUR" },
];

export const FILTER_OPTIONS_RANGE = {
  NONE: { min: 0, max: 0, default: null },
  GRAYSCALE: { min: 0, max: 100, default: 0 },
  BRIGHTNESS: { min: 50, max: 200, default: 100 },
  CONTRAST: { min: 50, max: 200, default: 100 },
  SATURATE: { min: 0, max: 300, default: 100 },
  SEPIA: { min: 0, max: 100, default: 0 },
  HUE_ROTATE: { min: 0, max: 360, default: 0 },
  BLUR: { min: 0, max: 20, default: 0 },
};

export const LIMIT_IMAGE_SIZE = {
  DESKTOP: 1024 / 2,
  MOBILE: 425 / 2,
};
