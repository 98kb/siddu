<script lang="ts">
  import {Button} from "$lib/components/ui/button";
  import UnstyledTextarea from "$lib/components/ui/textarea/UnstyledTextarea.svelte";
  import {injectDbClient} from "$lib/injectDbClient";
  import {selectedFact} from "./store/selectedFact";

  const db = injectDbClient();

  export let onClose: () => void;

  let fact = selectedFact;

  const save = async () => {
    if ("id" in $fact) {
      await db.facts.put($fact.id, $fact);
    } else {
      await db.facts.add($fact);
    }
    close();
  };

  const close = () => {
    $fact = {content: ""};
    onClose();
  };
</script>

<div class="flex flex-col w-full gap-4">
  <UnstyledTextarea
    autofocus
    class="w-full p-4"
    placeholder="Add a Fact..."
    bind:value={$fact.content}
  />
  <div class="flex">
    <Button variant="link" on:click={save}>Save</Button>
    <Button variant="link" on:click={close}>Cancel</Button>
  </div>
</div>
