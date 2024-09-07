<script lang="ts">
  import "../../app.css";
  import CommandDialog from '$lib/components/ui/command/command-dialog.svelte';
  import Composition from './Composition.svelte';
  import type { ORM } from '@repo/facts-db';
  import type { Observable } from "rxjs";
  import type {InputElement} from "$lib/InputElement";
  import { appendToInput } from "$lib/appendToInput";
  import { onMount } from "svelte";

  export let facts: ORM<"facts">;
  export let hookElement$: Observable<InputElement>;

  let open = false;
  let placeholder = "";

  const subscription = hookElement$.subscribe(() => {
    open = true;
  })

  const appendToHookedElement = (str: string) => {
    if ($hookElement$) {
      appendToInput($hookElement$, str);
      open = false;
    }
  };

  onMount(() => () => subscription.unsubscribe());

</script>


<CommandDialog
  class="min-w-[66vw]"
  closeFocus={$hookElement$}
  closeOnOutsideClick={false}
  bind:value={placeholder}
  bind:open
>
  <Composition
    {facts}
    {placeholder}
    on:composition={({detail}) => appendToHookedElement(detail)}
  />
</CommandDialog>
