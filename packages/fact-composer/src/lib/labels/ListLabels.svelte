<script lang="ts">
  import {createTable, Subscribe, Render, createRender} from "svelte-headless-table";
  import {labels} from "./store/labels";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table";
  import {getContext, onMount} from "svelte";
  import type {Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {liveStore} from "$lib/db/liveStore";
  import { identity } from "fp-ts/lib/function";
  import ListLabelsRowAction from "./ListLabelsRowAction.svelte";
  import type { Label } from "@repo/facts-db";
  import ListLabelItem from "./ListLabelItem.svelte";

  const {db} = getContext<Context>(contextKey);
  onMount(liveStore(db.labels, labels));

  const table = createTable(labels);
  const columns = table.createColumns([
    table.column({
      id: "label",
      accessor: identity,
      header: "Labels",
      cell: (cell) => createRender(ListLabelItem, {label: cell.value as Label}),
    }),
    table.column({
      id: "actions",
      accessor: identity,
      header: "",
      cell: (cell) =>  createRender(ListLabelsRowAction, {label: cell.value as Label}),
    })
  ]);

  const {tableAttrs, tableBodyAttrs, headerRows, pageRows} =
    table.createViewModel(columns);
</script>

<Table {...$tableAttrs}>
  <TableHeader>
    {#each $headerRows as headerRow}
      <Subscribe rowAttrs={headerRow.attrs()}>
        <TableRow>
          {#each headerRow.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} props={cell.props()} let:attrs>
              <TableHead {...attrs}>
                {#if cell.id === "label"}
                  <span class="font-bold">
                    {$labels.length}
                    <Render of={cell.render()} />
                  </span>
                {:else}
                  <Render of={cell.render()} />
                {/if}
              </TableHead>
            </Subscribe>
          {/each}
        </TableRow>
      </Subscribe>
    {/each}
  </TableHeader>
  <TableBody {...$tableBodyAttrs}>
    {#each $pageRows as row (row.id)}
      <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
        <TableRow {...rowAttrs}>
          {#each row.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} props={cell.props()} let:attrs>
              <TableCell {...attrs}>
                  <Render of={cell.render()} />
              </TableCell>
            </Subscribe>
          {/each}
        </TableRow>
      </Subscribe>
    {/each}
  </TableBody>
</Table>
