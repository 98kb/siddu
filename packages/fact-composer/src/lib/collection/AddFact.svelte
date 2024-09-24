<script lang="ts">
  import {injectDbClient} from "$lib/injectDbClient";
  import FactEditor from "./FactEditor.svelte";
  import {selectedFact} from "./store/selectedFact";

  const db = injectDbClient();

  const save = async () => {
    if ("id" in $selectedFact) {
      await db.facts.put($selectedFact.id, $selectedFact);
    } else {
      await db.facts.add($selectedFact);
    }
    cancel();
  };

  const cancel = async () => {
    $selectedFact = {content: "", labels: []};
  };
</script>

<FactEditor bind:fact={$selectedFact} {save} {cancel} />
