import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";

import {LabelPills} from "./LabelPills";
import {Button} from "~/components/ui/button";
import {XIcon} from "lucide-react";
import {LabelSchema} from "@repo/collection-service-defs";

const meta: Meta<typeof LabelPills> = {
  title: "labels/components/LabelPills",
  component: LabelPills,
  args: {
    onClick: fn(),
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

export const WithChildren: Story = {
  args: {
    labels,
    children: () => (
      <Button variant="ghost" size="icon-sm">
        <XIcon />
      </Button>
    ),
  },
};

export const WithHighlighted: Story = {
  args: {
    labels,
    highlightedLabels: [labels[0], labels[3]],
  },
};

// TODO: fix this story
export const WithClassName: Story = {
  args: {
    labels,
    className: "ellipsis truncate max-w-[100px]",
    children: () => (
      <Button variant="ghost" size="icon-sm">
        <XIcon />
      </Button>
    ),
  },
};
