import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import typescript from "@rollup/plugin-typescript";

const config = {
  input: "src/dev.ts",
  output: {
    file: "server/index.js",
    format: "es",
    name: "miniParser",
    sourcemap: true,
  },
  plugins: [
    typescript(),
    serve({
      open: true,
      port: 8082,
      contentBase: "",
    }),
    livereload(),
  ],
};

export default config;
