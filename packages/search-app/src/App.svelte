<script lang="ts">
  import "./app.css";
  import Modal from "$lib/Modal.svelte";
  import {isModalOpen} from './stores/isModalOpen';
  import {element, type InputElement} from './stores/element';

  const inputs = document.querySelectorAll("input");
  const textareas = document.querySelectorAll("textarea");

  const openModal = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === ".") {
      isModalOpen.set(true);
      element.set(e.target as InputElement);
    }
  };

  for (const input of inputs) {
    input.addEventListener("keydown", openModal);
  }

  for (const textarea of textareas) {
    textarea.addEventListener("keydown", openModal);
  }
</script>

<Modal />
