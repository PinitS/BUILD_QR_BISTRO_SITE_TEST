/* eslint-disable no-undef */
export const hold = async ({ sec = 1 }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
};
