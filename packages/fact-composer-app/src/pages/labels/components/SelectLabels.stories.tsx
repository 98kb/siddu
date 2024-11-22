import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";
import {SelectLabels} from "./SelectLabels";
import {Button} from "~/components/ui/button";
import {TagIcon} from "lucide-react";
import {LabelSchema} from "@repo/collection-service-defs";
import {dummyCollection} from ".storybook/trpc";
import {CollectionContext} from "~/pages/collection/context/CollectionContext";

const labels: LabelSchema[] = [
  {
    _id: "1",
    name: "ChatGPT",
  },
  {
    _id: "2",
    name: "GPT-3",
  },
  {
    _id: "3",
    name: "GoT",
  },
  {
    _id: "4",
    name: "WorkExp",
  },
  {
    _id: "5",
    name: "Personal Life Experiences of a Software Engineer",
  },
];

const meta: Meta<typeof SelectLabels> = {
  title: "labels/components/SelectLabels",
  component: SelectLabels,
  args: {
    onSelect: fn(),
  },

  decorators: [
    Story => (
      <CollectionContext.Provider value={dummyCollection}>
        <Story />
      </CollectionContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: [labels[0], labels[3]],
    children: () => (
      <Button variant="ghost" size="icon-sm">
        <TagIcon />
      </Button>
    ),
  },
};
