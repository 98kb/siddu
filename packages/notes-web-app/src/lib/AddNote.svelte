<script lang="ts">
  let input: HTMLInputElement;
  let notes: string[] = [];

  function addNote() {
    notes.push(input.value);
    input.value = "";
    notes = notes;
  }

  function removeNote(index: number) {
    notes.splice(index, 1);
    notes = notes;
  }
</script>


<form on:submit|preventDefault={addNote}>
  <input
  bind:this={input}
  class="focus-within:outline-none"
  placeholder="Start typing..."
  />
</form>

<div class="grid grid-flow-row grid-cols-3 gap-7">
  {#each notes as note, i}
    <div>
      <p>#{i} {note}</p>
      <button on:click={() => removeNote(i)}>[x]</button>
    </div>
  {/each}
</div>
