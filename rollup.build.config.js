import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: "src/main.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
    sourcemap: false,
  },
  plugins: [
    del({ targets: "dist/*" }),
    typescript(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
    }),
    terser(),
  ],
};

export default config;
