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
  let [minColWidth, maxColWidth, gap] = [150, 200, 15];

  onMount(liveStore(db.facts, facts));
</script>

<div class="flex w-full">
  <aside class="min-w-[15vw] pr-10 py-5">
    <LabelList />
  </aside>
  <div id="grid" class="flex w-full h-full">
    <Masonry
      class="w-full py-4"
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
  <AddFact />
</div>
