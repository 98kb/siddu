<script lang="ts">
  import "../../app.css";
  import CommandDialog from "$lib/components/ui/command/command-dialog.svelte";
  import {setContext} from "svelte";
  import {type Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {inputEl} from "./store/inputEl";
  import Navbar from "$lib/nav/Navbar.svelte";
  import type {DbClient} from "@repo/facts-db";
  import SwitchRouter from "$lib/router/SwitchRouter.svelte";
  import {routes} from "./routes";
  import {type Route} from "./Route";

  export let db: DbClient;
  let open = false;
  setContext<Context>(contextKey, {db});
  $: {
    if ($inputEl) {
      open = true;
    }
  }

  let activeRoute: Route = "collection";
</script>

<CommandDialog
  {open}
  closeOnOutsideClick={false}
  onOpenChange={isOpen => {
    open = isOpen;
  }}
>
  <div class="flex w-full h-full rounded-lg">
    <Navbar bind:activeTab={activeRoute} />
    <div class="flex flex-col w-full h-full">
      <h1 class="p-4 capitalize border-b">
        {activeRoute}
      </h1>
      <SwitchRouter
        {routes}
        {activeRoute}
        on:submit={() => {
          open = false;
        }}
      />
    </div>
  </div>
</CommandDialog>
