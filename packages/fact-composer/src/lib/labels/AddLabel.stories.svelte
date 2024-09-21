<script lang="ts">
  import {Meta, Story} from '@storybook/addon-svelte-csf';
  import {DbClient, createMemoryAdapter} from "@repo/facts-db";
  import AddLabel from './AddLabel.svelte';
  import {setContext} from 'svelte';
  import {contextKey} from '$lib/contextKey';
  import {type Context} from '$lib/Context';

  const db = new DbClient(createMemoryAdapter);
  setContext<Context>(contextKey, {db});
</script>

<Meta
  title="features/labels/AddLabel"
  component={AddLabel}
/>

<Story name="Create Mode">
  <AddLabel />
</Story>
