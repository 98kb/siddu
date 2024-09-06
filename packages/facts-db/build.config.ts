import {defineBuildConfig} from "unbuild";

export default defineBuildConfig({
  entries: ["src/index.ts"],
  sourcemap: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
});
