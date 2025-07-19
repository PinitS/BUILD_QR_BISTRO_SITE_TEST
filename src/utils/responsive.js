// utils/responsive.js

// Initial values set to 0, they will be updated on the client-side
export let currentViewportWidth = 0;
export let currentViewportHeight = 0;

// --- FIGMA DESIGN DIMENSIONS ---
export const DESIGN_DIMENSIONS_WIDTH = 375;
export const DESIGN_DIMENSIONS_HEIGHT = 812;
// --- END FIGMA DESIGN DIMENSIONS ---

const MIN_PX = 0;

export const fitPx = ({ px, dt = "h", sf = false, min = MIN_PX }) => {
  if (px === "auto") {
    return "auto";
  }

  if (typeof px === "string" && px.includes("%")) {
    return px;
  }

  const numericPx = typeof px === "string" ? parseFloat(px) : px;
  const safePx = numericPx < min ? min : numericPx;

  let result;
  if (dt === "w") {
    // Ensure currentViewportWidth is available (it will be 0 on server)
    // If on server, this will result in 0, which is handled by a separate update mechanism in the component.
    result = (safePx / DESIGN_DIMENSIONS_WIDTH) * currentViewportWidth;
  } else {
    result = (safePx / DESIGN_DIMENSIONS_HEIGHT) * currentViewportHeight;
  }

  const roundedResult = Math.round(result);

  return sf ? `${roundedResult}px` : roundedResult;
};

// ตรวจสอบว่ามี 'export const' ตรงนี้หรือไม่
export const initializeResponsiveDimensions = () => {
  // <--- ตรงนี้ต้องมี 'export const'
  if (typeof window !== "undefined") {
    currentViewportWidth = window.innerWidth;
    currentViewportHeight = window.innerHeight;

    window.addEventListener("resize", () => {
      currentViewportWidth = window.innerWidth;
      currentViewportHeight = window.innerHeight;
    });
  }
};
