import {cpSync, readFileSync, readSync} from "node:fs";
import {fileURLToPath} from "node:url";

console.log(import.meta);

const pathToExtension = fileURLToPath(
  import.meta.resolve(
    "./chrome-mv3",
    // "../web-extension/.output/chrome-mv3",
  ),
);

console.log(
  "pathnamwe",
  pathToExtension,
  readFileSync(fileURLToPath(import.meta.url)),
);

cpSync(pathToExtension, ".extension", {recursive: true});
