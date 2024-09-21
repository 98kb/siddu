<script lang="ts">
  import {contextKey} from "$lib/contextKey";
  import SidebarLayout from "$lib/layouts/SidebarLayout.svelte";
  import AddLabel from "./AddLabel.svelte";
  import {getContext, onMount} from "svelte";
  import {liveStore} from "$lib/db/liveStore";
  import {labels} from "./store/labels";
  import type {Context} from "$lib/Context";

  const {db} = getContext<Context>(contextKey);
  onMount(liveStore(db.labels, labels));
</script>

<SidebarLayout>
  <slot name="sidebar"></slot>
  <AddLabel />
</SidebarLayout>
