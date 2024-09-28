<script lang="ts">
  import "../../app.css";
  import {setContext} from "svelte";
  import {type Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {inputEl} from "./store/inputEl";
  import Navbar from "$lib/nav/Navbar.svelte";
  import type {DbClient} from "@repo/facts-db";
  import SwitchRouter from "$lib/router/SwitchRouter.svelte";
  import {routes} from "./routes";
  import {type Route} from "./Route";
  import { Dialog, DialogContent } from "$lib/components/ui/dialog";

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

<Dialog
  {open}
  portal={null}
  closeOnOutsideClick={false}
  onOpenChange={isOpen => {
    open = isOpen;
  }}
>
  <DialogContent class="flex gap-0 h-full rounded-lg overflow-y-scroll overflow-x-visible p-0 min-w-[70vw] min-h-[600px] max-h-[600px] max-w-[70vw]">
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
  </DialogContent>
</Dialog>
