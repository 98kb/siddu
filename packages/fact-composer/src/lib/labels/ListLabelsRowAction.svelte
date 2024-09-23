<script lang="ts">
  import {Button} from "$lib/components/ui/button";
  import {injectDbClient} from "$lib/injectDbClient";
  import type {Label} from "@repo/facts-db";
  import {selectedLabel} from "./store/selectedLabel";

  export let label: Label;
  const db = injectDbClient();
</script>

<div class="flex gap-1 w-full justify-end">
  <Button variant="secondary" on:click={() => selectedLabel.set(label)}
    >Edit</Button
  >
  <Button variant="destructive" on:click={() => db.labels.delete(label.id)}
    >Delete</Button
  >
</div>
