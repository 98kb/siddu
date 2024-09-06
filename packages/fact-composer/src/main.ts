import { ORM, LocalAdapter } from '@repo/facts-db';
import './app.css';
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app')!,
  props: {
    facts: new ORM(new LocalAdapter("facts")),
  }
})

export default app
