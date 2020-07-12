import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import svg from "rollup-plugin-svg";

export default {
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true,
    exports: "named",
  },
  plugins: [
    peerDepsExternal({
      includeDependencies: true,
    }),
    resolve(),
    svg(),
    commonjs({ include: /node_modules/ }),
    babel({
      babelHelpers: "runtime",
      exclude: /node_modules/,
    }),
  ],
};
