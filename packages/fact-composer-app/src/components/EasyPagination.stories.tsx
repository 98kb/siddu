import type {Meta, StoryObj} from "@storybook/react";
import {EasyPagination} from "./EasyPagination";
import {fn} from "@storybook/test";

const meta: Meta<typeof EasyPagination> = {
  title: "components/EasyPagination",
  component: EasyPagination,
  args: {
    onNext: fn(),
    onPrevious: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const _EasyPagination: Story = {};
