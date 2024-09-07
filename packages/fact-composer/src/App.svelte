<script lang="ts">
  import "./app.css";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import ComposerModal from "$lib/composer/ComposerModal.svelte";
  import type {ORM} from "@repo/facts-db";
  import { requestComposer$ } from "$lib/composer/requestComposer$";

  export let facts: ORM<"facts">;

</script>

<Textarea />
<ComposerModal {facts} hookElement$={requestComposer$} />
