<script lang="ts">
  import Command from "$lib/components/ui/command/command.svelte";
  import type { ComponentProps } from "svelte";
  import Composition from "./Composition.svelte";

  type $$Props = ComponentProps<Composition>;
  let placeholder = "";
</script>

<Command bind:value={placeholder}>
  <Composition {...$$restProps} {placeholder} />
</Command>
