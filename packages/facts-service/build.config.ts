import {defineBuildConfig} from "unbuild";

export default defineBuildConfig({
  entries: ["src/"],
  sourcemap: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
});
