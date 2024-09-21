<script lang="ts">
  import {Button} from "$lib/components/ui/button";
  import {PencilRulerIcon, HomeIcon, NotebookIcon, TagIcon} from "lucide-svelte";
</script>

<div class="flex flex-col min-w-14 h-full shadow items-center py-2 gap-4">
  <Button size="icon" variant="ghost">
    <HomeIcon />
  </Button>
  <Button size="icon" variant="default">
    <PencilRulerIcon />
  </Button>
  <Button size="icon" variant="ghost">
    <NotebookIcon />
  </Button>
  <Button size="icon" variant="ghost">
    <TagIcon />
  </Button>
</div>
