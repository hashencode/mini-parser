import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";

const config = {
  input: "src/main.ts",
  output: {
    file: "dist/index.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    del({ targets: "dist/*" }),
    typescript(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    terser(),
  ],
};

export default config;
