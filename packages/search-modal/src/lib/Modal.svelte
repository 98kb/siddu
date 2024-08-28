<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import type { ComponentProps } from "svelte";
  import { element } from "../stores/element";
  import {isModalOpen} from "../stores/isModalOpen";
  import * as Command from "./components/ui/command";

  let portal: HTMLDivElement;

  type $$Props = ComponentProps<Command.Dialog>;
</script>

<Command.Dialog
  {portal}
  bind:open={$isModalOpen}
  closeOnOutsideClick={false}
  closeOnEscape={true}
  {...$$restProps}
>
  <slot />
</Command.Dialog>

<div bind:this={portal}></div>
