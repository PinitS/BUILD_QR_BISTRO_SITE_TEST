module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals", // ถ้าใช้ Next.js
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",

    // ✅ เพิ่มกฎนี้เข้าไป
    "no-undef": "error",

    // ของเดิม
    "import/no-anonymous-default-export": "off",
    "react/display-name": "off",
  },
};
