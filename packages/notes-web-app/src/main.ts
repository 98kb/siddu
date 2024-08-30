import { FactsDb, LocalAdapter } from '@repo/facts-db';
import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
  props: {
    db: new FactsDb(new LocalAdapter("notes")),
  }
})

export default app
