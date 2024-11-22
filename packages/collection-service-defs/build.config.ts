import {defineBuildConfig} from "unbuild";

export default defineBuildConfig({
  entries: ["src/", "src/index"],
  sourcemap: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
});
