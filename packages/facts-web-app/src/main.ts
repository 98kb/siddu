import {createFactsDB, DbClient, DexieAdapter} from '@repo/facts-db';
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
  props: {
    db: new DbClient(
      (table) => new DexieAdapter(table, createFactsDB("facts"))
    ),
  }
})

export default app
