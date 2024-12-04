// import React from "react";
import "normalize.css";
import type {Preview} from "@storybook/react";
import {AuthClientStub} from "@repo/chrome-auth-service";
import {AuthContext} from "../src/auth/AuthContext";
import {TooltipProvider} from "../src/components/ui/tooltip";
import "../src/index.css";
import {RouterDecorator} from "~/lib/location/storybook/decorators/RouterDecorator";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <AuthContext.Provider value={new AuthClientStub()}>
        <TooltipProvider>
          <RouterDecorator>
            <Story />
          </RouterDecorator>
        </TooltipProvider>
      </AuthContext.Provider>
    ),
  ],
};

export default preview;
