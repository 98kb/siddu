import React from "react";
import type {Preview} from "@storybook/react";
import "../src/index.css";
import {MemoryRouter} from "react-router-dom";

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
