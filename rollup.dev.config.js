import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import typescript from "@rollup/plugin-typescript";

const config = {
  input: "src/dev.ts",
  output: {
    file: "server_build/index.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    typescript({
      sourceMap: true,
    }),
    serve({
      open: true,
      port: 8082,
      contentBase: "",
    }),
    livereload(),
  ],
};

export default config;
