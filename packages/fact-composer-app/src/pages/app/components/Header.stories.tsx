import type {Meta, StoryObj} from "@storybook/react";
import {Header} from "./Header";
import {RouterDecorator} from "~/lib/location/storybook/decorators/RouterDecorator";
import {Location} from "react-router-dom";

const meta = {
  title: "composer/components/Header",
  component: Header,
  decorators: [
    Story => (
      <RouterDecorator>
        <Story />
      </RouterDecorator>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    location: {
      pathname: "/collection/archive",
      search: "?query=foo",
    } as Location,
  },
};
