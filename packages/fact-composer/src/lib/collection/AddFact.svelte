<script lang="ts">
  import FactEditor from "./FactEditor.svelte";
  import {openFactEditor} from "./store/openFactEditor";
</script>

<div class="inline-flex w-full shadow-md border-2 cursor-text rounded-lg">
  {#if $openFactEditor}
    <FactEditor onClose={() => ($openFactEditor = false)} />
  {:else}
    <!-- svelte-ignore a11y-interactive-supports-focus -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      class="w-full cursor-text py-2 px-4"
      on:click={() => {
        $openFactEditor = true;
      }}
      role="button">Add a Fact...</span
    >
  {/if}
</div>
