<script lang="ts">
  import "./app.css";
  import ComposerModal from "$lib/composer/ComposerModal.svelte";
  import type { FactsService } from "@repo/facts-service";
  import { Textarea } from "$lib/components/ui/textarea";

  export let db: FactsService;
  let open = false;
  let value = "";
  let input: HTMLTextAreaElement | null;
</script>

<Textarea bind:value on:keydown={e => {
  input = e.currentTarget;
  if (e.key === "." && e.ctrlKey) {
    open = true;
  }
}} />
<ComposerModal
  {db}
  bind:open
  bind:value
  closeFocus={input}
/>
