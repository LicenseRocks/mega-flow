module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
      },
    ],
    "@babel/react",
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    [
      "styled-components",
      {
        displayName: true,
        ssr: true,
      },
    ],
  ],
};
