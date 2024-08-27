import './app.css';
import App from './App.svelte';
import {isModalOpen} from './stores/isModalOpen';

const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");

const openModal = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === ".") {
    isModalOpen.set(true);
  }
};

for (const input of inputs) {
  input.addEventListener("keydown", openModal);
}

for (const textarea of textareas) {
  textarea.addEventListener("keydown", openModal);
}

const app = new App({
  target: document.getElementById('app')!,
})

export default app
