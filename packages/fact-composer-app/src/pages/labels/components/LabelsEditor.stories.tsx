import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";

import {LabelsEditor} from "./LabelsEditor";
import {Label} from "@repo/facts-db";

const meta: Meta<typeof LabelsEditor> = {
  title: "labels/components/LabelsEditor",
  component: LabelsEditor,
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const labels: Label[] = [
  {
    id: 0,
    name: "ChatGPT",
  },
  {
    id: 1,
    name: "GPT-3",
  },
  {
    id: 2,
    name: "GoT",
  },
  {
    id: 3,
    name: "WorkExp",
  },
  {
    id: 4,
    name: "Personal Life Experiences of a Software Engineer",
  },
];

export const Default: Story = {
  args: {
    labels,
  },
};
