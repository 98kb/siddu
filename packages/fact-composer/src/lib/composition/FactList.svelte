<script lang="ts">
  import CommandList from "$lib/components/ui/command/command-list.svelte";
  import CommandEmpty from "$lib/components/ui/command/command-empty.svelte";
  import {CommandItem} from "$lib/components/ui/command";
  import {append} from "./store/composition";
  import {facts} from "./store/facts";
  import FactPlaceHolder from "./FactPlaceHolder.svelte";
  import FactListItem from "./FactListItem.svelte";
  import {getContext, onMount} from "svelte";
  import type {Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {liveStore} from "$lib/db/liveStore";

  const {db} = getContext<Context>(contextKey);
  onMount(liveStore(db.facts, facts));
</script>

<CommandList>
  <CommandEmpty class="p-0 h-full">
    <FactPlaceHolder />
  </CommandEmpty>
  {#each $facts as fact (fact.id)}
    <CommandItem value={`${fact.id}`} onSelect={() => append(fact.content)}>
      <FactListItem {fact} />
    </CommandItem>
  {/each}
</CommandList>
