import { Notes, NotesDummy } from '@repo/notes-db'
import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
  props: {
    notes: new Notes(),
  }
})

export default app
