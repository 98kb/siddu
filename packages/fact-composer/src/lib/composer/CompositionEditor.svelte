<script lang="ts">
  import {composition} from "./store/composition";
  import UnstyledTextarea from "$lib/components/ui/textarea/UnstyledTextarea.svelte";
</script>

<div class="flex justify-end">
  <slot />
</div>

<UnstyledTextarea
  bind:value={$composition}
  class="w-full h-full"
/>
