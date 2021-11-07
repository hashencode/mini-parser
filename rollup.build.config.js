import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const config = {
  input: "src/main.ts",
  output: {
    file: "dist/index.js",
    format: "es",
    name: "miniParser",
    sourcemap: false,
  },
  plugins: [
    typescript(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    terser(),
  ],
};

export default config;
