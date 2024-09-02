<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import type {FactsORM, Fact} from "@repo/facts-db";
  import { element } from '../stores/element';
  import { isModalOpen } from "../stores/isModalOpen";

  export let db: FactsORM;

  const facts = db.toObservable(() => db.objects.getAll());
  $: console.log('here', $facts);


  const handleSelect = (fact: Fact) => {
    const text = fact.content;
    isModalOpen.set(false);
    if($element) {
      $element.value = [$element?.value, text].join(" ");
      $element.focus();
    }
  };
</script>

<Command.Input placeholder="Type to search..." />
<Command.List>
  {#each $facts as fact (fact.id)}
    <Command.Item onSelect={() => handleSelect(fact)}>
      {fact.content}
    </Command.Item>
  {/each}
</Command.List>
