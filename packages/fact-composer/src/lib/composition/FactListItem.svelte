<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
import type {Fact} from "@repo/facts-db";

  export let fact: Fact;

  let labels = ["UX", "Software Engineering"]
</script>

<div class="flex flex-col w-full gap-2">
  {fact.content}
  <div class="flex">
    <Badge variant="outline">UX</Badge>
  </div>
</div>
