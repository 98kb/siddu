<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
import type { Label } from "@repo/facts-db";

  export let label: Label;
</script>

<Badge variant="outline">{label.name}</Badge>
