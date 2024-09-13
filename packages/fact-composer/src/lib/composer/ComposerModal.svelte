<script lang="ts">
  import "../../app.css";
  import CommandDialog from "$lib/components/ui/command/command-dialog.svelte";
  import Composition from "./Composition.svelte";
  import {onMount, setContext, type ComponentProps} from "svelte";
  import {FactsService} from "@repo/facts-service";
  import {type Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {syncFacts} from "./store/syncFacts";
  import {composition} from "./store/composition";
  import {selectedFact} from "./store/selectedFact";
  import {Button} from "$lib/components/ui/button";
  import CompositionEditor from "./CompositionEditor.svelte";

  export let db: FactsService;
  export let closeFocus: HTMLElement | null;
  export let value: string;
  export let open = false;
  setContext<Context>(contextKey, {db});
  onMount(syncFacts(db))
  $: {
    composition.set(value);
  }
  const submit = () => {
    open = false;
    value = $composition;
    closeFocus?.focus();
  }
</script>

<CommandDialog
  bind:open
  class="min-w-[66vw]"
  bind:value={$selectedFact}
>
  <Composition>
    <CompositionEditor>
      <Button on:click={submit}>OK</Button>
    </CompositionEditor>
  </Composition>
</CommandDialog>
