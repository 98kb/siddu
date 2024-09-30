import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";

import {CollectionNavTabs} from "./CollectionNavTabs";
import {NavTab} from "~/lib/NavTab";
import {ArchiveIcon, BookOpenTextIcon} from "lucide-react";
import {LabelIcon} from "./LabelIcon";

const meta = {
  title: "features/collection/components/CollectionNavTabs",
  component: CollectionNavTabs,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof CollectionNavTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs: NavTab[] = [
  {
    Icon: BookOpenTextIcon,
    name: "Facts",
    route: "/facts",
  },
  {
    Icon: LabelIcon,
    name: "ChatGPT",
    route: "/facts?label=0",
  },
  {
    Icon: LabelIcon,
    name: "GPT-3",
    route: "/facts?label=1",
  },
  {
    Icon: LabelIcon,
    name: "Game of Thrones",
    route: "/facts?label=2",
  },
  {
    Icon: LabelIcon,
    name: "WorkExp",
    route: "/facts?label=3",
  },
  {
    Icon: ArchiveIcon,
    name: "Archive",
    route: "/facts/archive",
  },
];

export const Default: Story = {
  args: {
    tabs,
    activeRoute: "/facts",
  },
};
