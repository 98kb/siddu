<script lang="ts">
  import FactEditor from "./FactEditor.svelte";
  import {openFactEditor} from "./store/openFactEditor";
</script>

<FactEditor onClose={() => ($openFactEditor = false)} />
