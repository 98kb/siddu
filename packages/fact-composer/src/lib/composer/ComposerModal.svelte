<script lang="ts">
  import "../../app.css";
  import CommandDialog from "$lib/components/ui/command/command-dialog.svelte";
  import Composition from "./Composition.svelte";
  import {setContext, type ComponentProps} from "svelte";
  import {FactsService} from '@repo/facts-service';
  import {type Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {type Fact} from "@repo/facts-db";
  import {type Reader} from "fp-ts/Reader";

  export let db: FactsService;
  export let closeFocus: ComponentProps<CommandDialog>["closeFocus"];
  export let value: string;
  export let open = false;
  export let onChange: Reader<string, void> = () => {};
  export let onOpenChange: Reader<boolean, void> = () => {};

  let placeholder = "";
  let facts: Fact[] = [];

  async function fetchFacts() {
    facts = await db.facts.getAll();
  }

  fetchFacts();

  setContext<Context>(contextKey, {db});
</script>

<CommandDialog
  {open}
  {closeFocus}
  class="min-w-[66vw]"
  closeOnOutsideClick={false}
  bind:value={placeholder}
  {onOpenChange}
>
  <Composition
    {placeholder}
    {value}
    {facts}
    on:change={(e) => onChange(e.detail)}
  />
</CommandDialog>
