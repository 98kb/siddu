<script lang="ts">
  import {injectDbClient} from "$lib/injectDbClient";
  import {cn} from "$lib/utils";
  import FactEditor from "./FactEditor.svelte";
  import type {Fact, InsertFact} from "@repo/facts-db";
  import FactEditorToolbar from "./FactEditorToolbar.svelte";

  const db = injectDbClient();
  export let fact: Fact | InsertFact | undefined;
  $: open = Boolean(fact);

  const onSave = async () => {
    if (fact && "id" in fact) {
      console.log('here');

      await db.facts.put(fact.id, fact);
    }
    onClose();
  };

  const onCreate = async () => {
    fact && (await db.facts.add(fact));
    onClose();
  };

  const onClose = async () => {
    fact = undefined;
  };

  const onArchive = async () => {
    if (fact && "id" in fact) {
      await db.facts.delete(fact.id);
      onClose();
    }
  };
</script>

<div
  class={cn(
    !open && "scale-x-0",
    open && "w-full",
    "h-full overflow-hidden transition-transform",
  )}
>
  {#if fact}
    <FactEditor bind:fact>
      <FactEditorToolbar bind:fact {onSave} {onClose} {onCreate} {onArchive} />
    </FactEditor>
  {/if}
</div>
