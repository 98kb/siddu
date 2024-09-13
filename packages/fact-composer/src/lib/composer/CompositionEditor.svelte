<script lang="ts">
  import Button from "$ui/button/button.svelte";
  import {composition} from "./store/composition";
  import UnstyledTextarea from "$lib/components/ui/textarea/UnstyledTextarea.svelte";

  const copyValue = () => navigator.clipboard.writeText($composition);
</script>

<UnstyledTextarea
  bind:value={$composition}
  class="w-full h-full"
/>
<div class="flex justify-end">
  <Button on:click={copyValue}>Copy</Button>
  <slot />
</div>
