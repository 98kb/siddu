<script lang="ts">
  import * as Card from "$lib/components/ui/card";
</script>

<Card.Root class="group max-w-[250px] shadow-none border-gray-300 break-inside-avoid mb-4">
  <Card.Header>
  </Card.Header>
  <Card.Content>
    <p class="break-words cursor-default">
      <slot />
    </p>
  </Card.Content>
  <Card.Footer class="opacity-0 group-hover:opacity-100">
    <slot name="footer" />
  </Card.Footer>
</Card.Root>

