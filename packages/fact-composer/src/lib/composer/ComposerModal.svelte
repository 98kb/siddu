<script lang="ts">
  import "../../app.css";
  import CommandDialog from "$lib/components/ui/command/command-dialog.svelte";
  import Composition from "./Composition.svelte";
  import {type ComponentProps} from "svelte";
  import type {createAppRouter, FactsService} from "../../../../facts-service-trpc/dist";

  export let db: FactsService;
  export let closeFocus: ComponentProps<CommandDialog>["closeFocus"];
  export let value: string;
  export let open = false;

  let placeholder = "";
</script>

<CommandDialog
  {open}
  {closeFocus}
  class="min-w-[66vw]"
  closeOnOutsideClick={false}
  bind:value={placeholder}
  on:changeOpen
>
  <Composition
    {placeholder}
    {value}
    on:change
  />
</CommandDialog>
