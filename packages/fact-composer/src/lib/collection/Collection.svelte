<script lang="ts">
  import {facts} from "$lib/composition/store/facts";
  import Masonry from "svelte-bricks";
  import FactCard from "./FactCard.svelte";
  import LabelList from "./LabelList.svelte";
  import AddFact from "./AddFact.svelte";
  import {onMount} from "svelte";
  import {liveStore} from "$lib/db/liveStore";
  import {injectDbClient} from "$lib/injectDbClient";

  const db = injectDbClient();
  let [minColWidth, maxColWidth, gap] = [200, 200, 15];

  onMount(liveStore(db.facts, facts));
</script>

<div class="flex w-full py-5">
  <aside class="min-w-[15vw] pr-10">
    <LabelList />
  </aside>
  <div class="flex flex-col max-h-[475px] overflow-x-scroll w-full gap-10">
    <div class="w-3/5 self-center">
      <AddFact />
    </div>
    <Masonry
      class="w-full"
      style="justify-content:start;"
      items={$facts}
      {minColWidth}
      {maxColWidth}
      {gap}
      let:item={fact}
    >
      <FactCard {fact} />
    </Masonry>
  </div>
</div>
