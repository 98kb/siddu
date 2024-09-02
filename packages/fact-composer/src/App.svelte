<script lang="ts">
  import "./app.css";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import Composer from "$lib/Composer.svelte";
  import type { FactsORM } from "@repo/facts-db";

  export let db: FactsORM;

</script>

<Textarea />
<Composer {db} />
