import type {IAdapter, Tables} from "@repo/facts-db";
import type {IO} from "fp-ts/lib/IO";
import type {Writable} from "svelte/store";

/**
 * Synchronizes a Svelte writable store with a FactsDb adapter.
 *
 * @template T - The key of the table in the `Tables` type.
 * @param {IAdapter<T>} adapter - The adapter used to interact with the database.
 * @param {Writable<Awaited<ReturnType<IAdapter<T>["getAll"]>>>} store - The Svelte writable store to be synchronized.
 * @returns {() => void} A function to unsubscribe from the adapter's mutation events.
 */
export const liveStore = <T extends keyof Tables>(
  adapter: IAdapter<T>,
  store: Writable<Awaited<ReturnType<IAdapter<T>["getAll"]>>>,
): IO<void> => {
  const sync = async () => {
    console.log(
      "fetching labels",
      adapter.options.entity,
      await adapter.getAll(),
    );

    store.set(await adapter.getAll());
  };
  sync();
  return () => adapter.onMutation(sync).unsubscribe;
};
