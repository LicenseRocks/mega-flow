module.exports = {
  presets: [
    [
      "@babel/env",
      {
        loose: true,
        shippedProposals: true,
        modules: false,
        targets: {
          ie: 9,
        },
      },
    ],
    "@babel/react",
  ],
  plugins: [
    [
      "styled-components",
      {
        displayName: true,
        ssr: true,
      },
    ],
  ],
};
