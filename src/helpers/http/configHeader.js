const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const DEFAULT_HEADER = {
  "x-key": NEXT_PUBLIC_API_KEY,
};

export const configHeader = ({ isFormData = false }) => {
  const contentType = isFormData
    ? { "Content-Type": "multipart/form-data" }
    : { "Content-Type": "application/json" };
  return {
    ...DEFAULT_HEADER,
    ...contentType,
  };
};
