<script lang="ts">
  import EasyTooltip from "$lib/components/EasyTooltip.svelte";
  import {Button} from "$lib/components/ui/button";
  import {injectDbClient} from "$lib/injectDbClient";
  import type {Fact} from "@repo/facts-db";
  import {ArchiveXIcon} from "lucide-svelte";

  const db = injectDbClient();
  export let fact: Fact;

  const archive = async (e: MouseEvent) => {
    e.stopPropagation();
    await db.facts.delete(fact.id);
  };
</script>

<div class="flex">
  <EasyTooltip tooltip="Archive">
    <Button variant="ghost" size="icon-sm" on:click={archive}>
      <ArchiveXIcon />
    </Button>
  </EasyTooltip>
</div>
