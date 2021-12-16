<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let margin = false;
  export let fullwidth = false;
  export let indigo = false;
  export let green = false;
  export let orange = false;
  export let red = false;
  export let blue = false;

  const dispatch = createEventDispatcher();
</script>

<button
  class:margin
  class:fullwidth
  class:indigo
  class:green
  class:orange
  class:red
  class:blue
  on:click={() => dispatch("click")}
>
  <slot><!-- optional fallback --></slot>
</button>

<style>
  button {
    border: none;
    outline: none;
    border-radius: 0.25rem;
    font-size: 1.125rem;
    color: white;
    padding: 0.25rem 0.5rem;
  }

  button:hover {
    background-color: gray;
  }

  .margin {
    margin: 1rem;
  }

  .fullwidth {
    width: 100%;
  }

  .indigo {
    background-color: indigo;
  }

  .green {
    background-color: rgb(25, 138, 25);
  }

  .orange {
    background-color: rgb(216, 164, 67);
  }

  .red {
    background-color: rgb(221, 57, 57);
  }

  .blue {
    background-color: rgb(81, 81, 175);
  }
</style>
