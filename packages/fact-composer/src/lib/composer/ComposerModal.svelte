<script lang="ts">
  import "../../app.css";
  import CommandDialog from "$lib/components/ui/command/command-dialog.svelte";
  import Composition from "../composition/Composition.svelte";
  import {setContext} from "svelte";
  import {type Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {inputEl} from "./store/inputEl";
  import Navbar from "$lib/nav/Navbar.svelte";
  import type {DbClient} from "@repo/facts-db";
  import Router from "$lib/router/Router.svelte";
  import Labels from "$lib/labels/Labels.svelte";
  import Header from "$lib/router/Header.svelte";

  export let db: DbClient;
  let open = false;
  setContext<Context>(contextKey, {db});
  $: {
    if ($inputEl) {
      open = true;
    }
  }
</script>

<CommandDialog
  {open}
  closeOnOutsideClick={false}
  onOpenChange={open$ => {
    open = open$;
  }}
>
  <div class="flex w-full h-full rounded-lg">
    <Navbar />
    <div class="flex flex-col w-full h-full">
      <Header />
      <Router>
        <svelte:fragment slot="composition">
          <Composition
            onSubmit={() => {
              open = false;
            }}
          />
        </svelte:fragment>
        <svelte:fragment slot="labels">
          <Labels />
        </svelte:fragment>
      </Router>
    </div>
  </div>
</CommandDialog>
