<script lang="ts">
  import "../../app.css";
  import CommandDialog from "$lib/components/ui/command/command-dialog.svelte";
  import Composition from "./Composition.svelte";
  import {createEventDispatcher, setContext, type ComponentProps} from "svelte";
  import {FactsService} from "@repo/facts-service";
  import {type Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {useFacts} from "./store/useFacts"

  type EventMap = {
    "update:open": boolean;
  };
  const dispatch = createEventDispatcher<EventMap>();

  export let db: FactsService;
  export let closeFocus: ComponentProps<CommandDialog>["closeFocus"];
  export let value: string;
  export let open = false;

  let facts = useFacts(db);
  let placeholder = "";
  setContext<Context>(contextKey, {db});
</script>

<CommandDialog
  {open}
  {closeFocus}
  class="min-w-[66vw]"
  closeOnOutsideClick={false}
  bind:value={placeholder}
  onOpenChange={isOpen => {dispatch("update:open", isOpen)}}
>
  <Composition
    {placeholder}
    {value}
    facts={$facts}
    on:update:value
  />
</CommandDialog>
