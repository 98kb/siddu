import type {Meta, StoryObj} from "@storybook/react";
import {FactList} from "./FactList";
import {RouterDecorator} from "~/lib/location/storybook/decorators/RouterDecorator";
import {fn} from "@storybook/test";
import {dummyCollection} from "~/../.storybook/trpc";
import {CollectionContext} from "~/pages/collection/context/CollectionContext";

const meta: Meta<typeof FactList> = {
  title: "composition/features/FactList",
  component: FactList,
  args: {
    onClick: fn(),
  },
  decorators: [
    Story => (
      <CollectionContext.Provider value={dummyCollection}>
        <RouterDecorator>
          <Story />
        </RouterDecorator>
      </CollectionContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
