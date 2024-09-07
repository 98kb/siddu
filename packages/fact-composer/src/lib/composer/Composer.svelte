<script lang="ts">
  import Command from "$lib/components/ui/command/command.svelte";
  import Composition from "./Composition.svelte";
  import type { ORM } from "@repo/facts-db";

  export let facts: ORM<"facts">;
  const facts$ = facts.toObservable(() => facts.objects.getAll());
  let placeholder = "";
</script>

<Command bind:value={placeholder}>
  <Composition
    {placeholder}
    facts={$facts$}

  />
</Command>
