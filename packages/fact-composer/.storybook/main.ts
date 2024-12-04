import {seedDb} from "./seedDb";
import type {StorybookConfig} from "@storybook/react-vite";
import {startCollectionServer} from "./trpc";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: config => {
    // eslint-disable-next-line no-console
    console.log("dummy collection server started @", startCollectionServer());
    seedDb();
    return config;
  },
};
export default config;
