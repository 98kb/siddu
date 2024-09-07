<script lang="ts">
  import "../../app.css";
  import CommandDialog from "$lib/components/ui/command/command-dialog.svelte";
  import Composition from "./Composition.svelte";
  import type { ORM } from "@repo/facts-db";
  import type { Observable } from "rxjs";
  import type { InputElement } from "$lib/InputElement";
  import { onMount } from "svelte";

  export let facts: ORM<"facts">;
  export let input$: Observable<InputElement>;

  let open = false;
  let placeholder = "";
  let value: string;
  let inputEl: InputElement;

  $: {
    value = $input$?.value;
  }

  onMount(
    () =>
      input$.subscribe((el) => {
        open = true;
        inputEl = el;
      }).unsubscribe,
  );
</script>

<CommandDialog
  class="min-w-[66vw]"
  closeFocus={$input$}
  closeOnOutsideClick={false}
  bind:value={placeholder}
  bind:open
>
  <Composition
    {facts}
    {placeholder}
    {value}
    on:change={({ detail: newValue }) => {
      inputEl.value = newValue;
      open = false;
    }}
  />
</CommandDialog>
