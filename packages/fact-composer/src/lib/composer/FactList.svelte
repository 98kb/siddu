<script lang="ts">
  import CommandList from "$lib/components/ui/command/command-list.svelte";
  import CommandEmpty from "$lib/components/ui/command/command-empty.svelte";
  import CommandItem from "$lib/components/ui/command/command-item.svelte";
  import {append} from "./store/composition";
  import {facts} from './store/facts';
  import FactPlaceHolder from "./FactPlaceHolder.svelte";
</script>

<CommandList>
  <CommandEmpty class="p-0 h-full">
    <FactPlaceHolder />
  </CommandEmpty>
  {#each $facts as fact (fact.id)}
    <CommandItem value={`${fact.id}`} onSelect={() => append(fact.content)}>
      {fact.content}
    </CommandItem>
  {/each}
</CommandList>
