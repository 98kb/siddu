import {defineRunnerConfig} from "wxt";

export default defineRunnerConfig({
  binaries: {
    chrome: "/opt/google/chrome/chrome",
  },
  // https://github.com/GoogleChrome/chrome-launcher/issues/6#issuecomment-341491690
  chromiumArgs: ["--no-sandbox"],
});
