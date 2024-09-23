<script lang="ts">
  import {Button} from "$lib/components/ui/button";
  import {appendText, inputEl} from "$lib/composer/store/inputEl";
  import type {IO} from "fp-ts/lib/IO";
  import CompositionEditor from "./CompositionEditor.svelte";
  import FactList from "./FactList.svelte";
  import {composition} from "./store/composition";
  import SidebarLayout from "$lib/layouts/SidebarLayout.svelte";

  export let onSubmit: IO<void>;
  function submit() {
    $inputEl && appendText($inputEl, $composition);
    $composition = "";
    onSubmit();
  }
</script>

<SidebarLayout>
  <CompositionEditor>
    <Button on:click={submit}>OK</Button>
  </CompositionEditor>

  <svelte:fragment slot="sidebar">
    <FactList />
  </svelte:fragment>
</SidebarLayout>
