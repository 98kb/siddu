import {createFactsDB} from '@repo/facts-db';
import {FactsService, DexieAdapter} from "@repo/facts-service";
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
  props: {
    db: new FactsService(
      (table) => new DexieAdapter(table, createFactsDB("facts"))
    ),
  }
})

export default app
