<script lang="ts">
  import {Meta, Story} from "@storybook/addon-svelte-csf";
  import SearchInput from "./SearchInput.svelte";

  let value = "";

</script>

<Meta
  autodocs
  title="features/search/SearchInput"
  component={SearchInput}
  tags={["autodocs"]}
  parameters={{layout: "centered"}}
/>

<Story
  name="Search Input"
  let:args
>
  <SearchInput {...args} bind:value />
</Story>
