import {FactsORM, LocalAdapter} from '@repo/facts-db';
import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
  props: {
    db: new FactsORM(new LocalAdapter("facts")),
  }
})

export default app
