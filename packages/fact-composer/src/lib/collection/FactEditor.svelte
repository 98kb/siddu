<script lang="ts">
  import {Button} from "$lib/components/ui/button";
  import UnstyledTextarea from "$lib/components/ui/textarea/UnstyledTextarea.svelte";
  import {injectDbClient} from "$lib/injectDbClient";
  import SelectLabels from "$lib/labels/SelectLabels.svelte";
  import type { Label } from "@repo/facts-db";
  import {selectedFact} from "./store/selectedFact";
  import LabelPills from "$lib/labels/LabelPills.svelte";
  import { labels } from "$lib/labels/store/labels";

  const db = injectDbClient();
  export let onClose: () => void;
  let fact = selectedFact
  let selectedLabels: Label[] = [];

  const save = async () => {
    if ("id" in $fact) {
      await db.facts.put($fact.id, $fact);
    } else {
      await db.facts.add($fact);
    }
    close();
  };
  const close = () => {
    $fact = {content: ""};
    onClose();
  };
</script>

<div class="flex flex-col w-full gap-4 px-3 py-4 border">
  <div class="flex w-full">
    <div class="flex">
      <SelectLabels bind:selectedLabels />
    </div>
    <div class="grow"></div>
    <Button variant="link" on:click={save}>Save</Button>
    <Button variant="link" on:click={close}>Cancel</Button>
  </div>
  <div class="flex gap-2">
    <LabelPills bind:labels={selectedLabels} />
  </div>
  <UnstyledTextarea
    autofocus
    class="w-full py-4 px-1 min-h-[120px] grow"
    placeholder="Add a Fact..."
    bind:value={$fact.content}
  />
</div>
