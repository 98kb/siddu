<script lang="ts">
  import {Input} from "$lib/components/ui/input";
  import type {Label as ILabel, InsertLabel} from "@repo/facts-db";
  import type {Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {getContext} from "svelte";
  import {Button} from "$lib/components/ui/button";
  import {selectedLabel} from "./store/selectedLabel";

  const {db} = getContext<Context>(contextKey);
  let label: ILabel | InsertLabel = {name: ""};

  $: {
    label = $selectedLabel ?? {name: ""};
  }

  const submit = async () => {
    if ("id" in label) {
      await db.labels.put(label.id, label);
      selectedLabel.set(undefined);
    } else {
      await db.labels.add(label);
      label = {name: ""};
    }
  };
</script>

<form class="flex w-full gap-3 py-5" on:submit|preventDefault={submit}>
  <Input
    id="label-name"
    type="text"
    placeholder="Label name"
    bind:value={label.name}
  />
  <Button on:click={submit}>Save</Button>
</form>
