import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

const config = {
  input: "src/main.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
    sourcemap: false,
    exports: "default",
  },
  plugins: [
    del({ targets: "dist/*" }),
    typescript({
      sourceMap: false,
    }),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
    }),
    terser(),
    copy({
      targets: [{ src: "component/miniParser", dest: "dist/component" }],
    }),
  ],
};

export default config;
