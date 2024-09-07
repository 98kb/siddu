import type { Meta, StoryObj } from '@storybook/svelte';
import Composer from './Composer.svelte';
import { ORM, type InsertObject } from '@repo/facts-db';
import { MemoryAdapter } from "@repo/facts-db-adapter";

const meta = {
  title: 'features/Composer',
  component: Composer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
} satisfies Meta<Composer>;

export default meta;
type Story = StoryObj<typeof meta>;

const facts = new ORM(new MemoryAdapter());

const workExperiences: InsertObject<"facts">[] = [
  {
    content: "Collaborated with offshore technology leadership to develop a new product",
  },
  {
    content: "A hands-on front-end heavy software engineer with about 9 years of professional experience and over a decade of software development expertise.",
  },
  {
    content: "Lead a team of 4 engineers to deliver a new feature",
  },
  {
    content: "Passion and proficiency in Front-end architecture, User Experience design and Cloud-native infrastructure.",
  },
  {
    content: "Developed a new feature for a large-scale web application",
  },
  {
    content: "Strong ability to adapt and adopt best practices in software development.",
  }
]

for (const workExperience of workExperiences) {
  facts.objects.addOne(workExperience);
}

export const _Composer: Story = {args: {facts}};
