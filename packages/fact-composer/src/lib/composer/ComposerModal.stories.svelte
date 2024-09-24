<script lang="ts">
  import {Meta, Story} from "@storybook/addon-svelte-csf";
  import {DbClient, MemoryAdapter, type InsertFact} from "@repo/facts-db";
  import ComposerModal from "./ComposerModal.svelte";
  import { seedDb } from "$lib/_mock/seedDb";

  const db = new DbClient(table => new MemoryAdapter(table));
  const emptyDb = new DbClient(table => new MemoryAdapter(table));

  seedDb(db);
</script>

<Meta
  autodocs
  title="features/ComposerModal"
  component={ComposerModal}
  tags={["autodocs"]}
  parameters={{layout: "centered"}}
/>

<Story id="Composer" name="ComposerModal" let:args>
  <textarea class="w-[70vw] h-[60vh]" value="Open Composer" />
  <ComposerModal {...args} {db} />
</Story>

<Story id="ComposerContentEditable" name="Content Editable" let:args>
  <p class="w-[70vw] h-[60vh]" contenteditable>Open Composer</p>
  <ComposerModal {...args} {db} />
</Story>

<Story id="EmptyComposer" name="Empty Composer Modal" let:args>
  <textarea value="Open Composer" />
  <ComposerModal {...args} db={emptyDb} />
</Story>
