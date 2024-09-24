<script lang="ts">
  import {Meta, Story} from "@storybook/addon-svelte-csf";
  import Collection from "./Collection.svelte";

  let value = "";

</script>

<Meta
  autodocs
  title="features/collection/Collection"
  component={Collection}
  tags={["autodocs"]}
  parameters={{layout: "centered"}}
/>

<Story
  name="Collections"
  let:args
>
  <Collection {...args} bind:value />
</Story>
