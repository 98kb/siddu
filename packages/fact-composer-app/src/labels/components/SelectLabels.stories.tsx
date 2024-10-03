import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";

import {createMemoryAdapter, DbClient, Label} from "@repo/facts-db";
import {SelectLabels} from "./SelectLabels";
import {seedDb} from "~/_mock/seedDb";
import {Button} from "~/components/ui/button";
import {TagIcon} from "lucide-react";
import {FactsDbContext} from "~/context/FactsDbContext";

const labels: Label[] = [
  {
    id: 1,
    name: "ChatGPT",
  },
  {
    id: 2,
    name: "GPT-3",
  },
  {
    id: 3,
    name: "GoT",
  },
  {
    id: 4,
    name: "WorkExp",
  },
  {
    id: 5,
    name: "Personal Life Experiences of a Software Engineer",
  },
];

const db = new DbClient(createMemoryAdapter);
seedDb(db, labels);

const meta = {
  title: "labels/components/SelectLabels",
  component: SelectLabels,
  args: {
    onSelect: fn(),
  },

  decorators: [
    Story => (
      <FactsDbContext.Provider value={db}>
        <Story />
      </FactsDbContext.Provider>
    ),
  ],
} satisfies Meta<typeof SelectLabels>;

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
