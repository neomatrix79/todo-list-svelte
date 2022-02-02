<script>
  // import Modal from "./components/Modal.svelte";
  import TodoList from "./components/TodoList.svelte";
</script>

<main>
  <TodoList />
</main>

<style>
  main {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    /* overflow-y: scroll; */
  }

  /* .media {
    width: 100%;
  }

  @media all and (min-width: 320px) {
    .media {
      width: 100%;
    }
  }
  @media all and (min-width: 768px) {
    .media {
      width: 50%;
    }
  }
  @media all and (min-width: 1024px) {
    .media {
      width: 20%;
    }
  } */
</style>
