<script lang="ts">
  import "./app.css";
  import {isModalOpen} from './stores/isModalOpen';
  import {element, type InputElement} from './stores/element';
  import SearchBar from "$lib/SearchBar.svelte";
  import { onMount } from "svelte";

  let inputs: NodeListOf<HTMLInputElement>;
  let textareas: NodeListOf<HTMLTextAreaElement>;

  const openModal = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === ".") {
      isModalOpen.set(true);
      element.set(e.target as InputElement);
    }
  };

  const addListeners = () => {
    console.log('adding listeners');
    inputs = document.querySelectorAll("input");
    textareas = document.querySelectorAll("textarea");

    for (const input of inputs) {
      input.addEventListener("keydown", openModal);
    }

    for (const textarea of textareas) {
      textarea.addEventListener("keydown", openModal);
    }
  };

  onMount(() => {
    document.addEventListener("load", () => {
      console.log('loaded');
    });
    setTimeout(addListeners, 5000);
    return () => {
      for (const input of inputs) {
        input.removeEventListener("keydown", openModal);
      }

      for (const textarea of textareas) {
        textarea.removeEventListener("keydown", openModal);
      }
    };
  });
</script>

<SearchBar />
