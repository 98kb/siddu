<script lang="ts">
  import {Input} from "$lib/components/ui/input";
  import {Label} from "$lib/components/ui/label";
  import type {Label as ILabel, InsertLabel} from "@repo/facts-db";
  import type {Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {getContext} from "svelte";

  export let label: ILabel | InsertLabel = {name: ""};
  const {db} = getContext<Context>(contextKey);

  const submit = async () => {
    await db.labels.add(label);
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="flex flex-col gap-3">
    <Label for="label-name">Name</Label>
    <Input
      id="label-name"
      type="text"
      class="w-full"
      bind:value={label.name}
    />
  </div>
</form>
