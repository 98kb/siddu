<script lang="ts">
  import "../../app.css";
  import CommandDialog from "$lib/components/ui/command/command-dialog.svelte";
  import Composition from "./Composition.svelte";
  import {onMount, setContext} from "svelte";
  import {FactsService} from "@repo/facts-service";
  import {type Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {syncFacts} from "./store/syncFacts";
  import {selectedFact} from "./store/selectedFact";
  import CompositionEditor from "./CompositionEditor.svelte";
  import { Button } from "$lib/components/ui/button";
  import { inputEl } from "./store/inputEl";
  import { composition } from "./store/composition";

  export let db: FactsService;
  let open = false;
  setContext<Context>(contextKey, {db});
  onMount(syncFacts(db));
  $: {
    if ($inputEl) {
      $composition = $inputEl.value;
      open = true;
    }
  }
  const submit = () => {
    const inputEl = $inputEl;
    if (inputEl) {
      inputEl.value = $composition;
    }
    open = false;
  };
</script>

<CommandDialog
  {open}
  class="min-w-[66vw]"
  bind:value={$selectedFact}
  closeOnOutsideClick={false}
  onOpenChange={(open$) => {
    open = open$;
  }}
>
  <Composition>
    <CompositionEditor>
      <Button on:click={submit}>OK</Button>
    </CompositionEditor>
  </Composition>
</CommandDialog>
