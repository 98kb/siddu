<script lang="ts">
  import {SearchIcon} from "lucide-svelte";

  export let value: string;
</script>

<div class="flex items-center border px-3 py-3 gap-3">
  <SearchIcon size={16} class="text-foreground" />
  <input
    type="text"
    class="w-full focus:outline-none text-sm text-foreground"
    placeholder="Type to search..."
    bind:value
  />
</div>
