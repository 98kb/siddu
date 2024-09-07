<script lang="ts">
  import "../../app.css";
  import CommandDialog from "$lib/components/ui/command/command-dialog.svelte";
  import Composition from "./Composition.svelte";
  import {ORM} from "@repo/facts-db";
  import type {Observable} from "rxjs";
  import type {InputElement} from "$lib/InputElement";
  import {setContext} from "svelte";
  import {Context} from "./Context";

  export let facts: ORM<"facts">;
  export let input$: Observable<InputElement>;

  setContext(Context.FactsORM, facts);

  const facts$ = facts.toObservable(() => facts.objects.getAll());
  let open = false;
  let placeholder = "";
  let value: string;
  let inputEl: InputElement;

  $: {
    value = $input$?.value;
  }

  $: {
    if ($input$) {
      open = true;
      inputEl = $input$;
    }
  }
</script>

<CommandDialog
  class="min-w-[66vw]"
  closeFocus={$input$}
  closeOnOutsideClick={false}
  bind:value={placeholder}
  bind:open
>
  <Composition
    {placeholder}
    {value}
    facts={$facts$}
    on:change={({ detail: newValue }) => {
      inputEl.value = newValue;
      open = false;
    }}
  />
</CommandDialog>
