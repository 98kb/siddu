import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";
import {LabelsEditor} from "./LabelsEditor";
import {LabelSchema} from "@repo/collection-service-defs";

const meta: Meta<typeof LabelsEditor> = {
  title: "labels/components/LabelsEditor",
  component: LabelsEditor,
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const labels: LabelSchema[] = [
  {
    _id: "0",
    name: "ChatGPT",
  },
  {
    _id: "1",
    name: "GPT-3",
  },
  {
    _id: "2",
    name: "GoT",
  },
  {
    _id: "3",
    name: "WorkExp",
  },
  {
    _id: "4",
    name: "Personal Life Experiences of a Software Engineer",
  },
];

export const Default: Story = {
  args: {
    labels,
  },
};
