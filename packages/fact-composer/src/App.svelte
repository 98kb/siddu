<script lang="ts">
  import "./app.css";
  import ComposerModal from "$lib/composer/ComposerModal.svelte";
  import {Textarea} from "$lib/components/ui/textarea";
  import type {DbClient} from "@repo/facts-db";

  export let db: DbClient;
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
