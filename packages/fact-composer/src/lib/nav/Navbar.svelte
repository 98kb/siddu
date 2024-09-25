<script lang="ts">
  import {Button} from "$lib/components/ui/button";
  import {
    PencilRulerIcon,
    HomeIcon,
    NotebookIcon,
    TagIcon,
    ShoppingBagIcon,
    HelpCircleIcon,
    UserCircleIcon,
  } from "lucide-svelte";
  import NavTab from "./NavTab.svelte";

  const tabs = [
    {
      name: "composition",
      icon: PencilRulerIcon,
    },
    {
      name: "collection",
      icon: NotebookIcon,
    },
    {
      name: "labels",
      icon: TagIcon,
    },
    {
      name: "marketplace",
      icon: ShoppingBagIcon,
    },
  ] as const;

  const bottomTabs = [
    {
      name: "settings",
      icon: HelpCircleIcon,
    },
    {
      name: "account",
      icon: UserCircleIcon,
    },
  ] as const;
</script>

<div
  class="flex flex-col min-w-14 max-h-[598px] box-border h-full shadow items-center py-2 gap-4"
>
  <Button size="icon" variant="ghost">
    <HomeIcon />
  </Button>
  {#each tabs as { name, icon }}
    <NavTab {name}>
      <svelte:component this={icon} />
    </NavTab>
  {/each}
  <div class="grow"></div>
  {#each bottomTabs as { name, icon }}
    <NavTab {name}>
      <svelte:component this={icon} />
    </NavTab>
  {/each}
</div>
