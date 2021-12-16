<script lang="ts">
  import { todoStore } from "../lib/stores";
  import type { TodoType } from "../lib/types";
  import { addTodo } from "../lib/utils";
  import Modal from "./Modal.svelte";
  import Todo from "./Todo.svelte";

  let todoText = "";
  let todos: TodoType[];
  let show = false;
  let removeId = "";

  $: todos = $todoStore;

  const onAdd = () => {
    todoStore.update((todos) => todos.concat(addTodo(todoText)));
    // todos.push(addTodo(todoText));
    // todos = todos;
    // todos = todos.concat(addTodo(todoText));
    todoText = "";
  };

  // const onEdit = (e: CustomEvent<{ todo: TodoType }>) => {

  //   const newTodo = e.detail.todo;
  //   const { id } = e.detail.todo;

  //   todoStore.update((todos) =>
  //     todos.map((todo) => (todo.id === id ? newTodo : todo))
  //   );
  // };

  // const onRemove = (e: CustomEvent<{ id: string }>) => {
  //   const { id } = e.detail;

  //   todoStore.update((todos) => todos.filter((todo) => todo.id !== id));
  // };

  const onEdit = (newTodo: TodoType) => {
    console.log(`edited todo: ${newTodo.done} - ${newTodo.text}`);

    todoStore.update((todos) =>
      todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
    );
  };

  const onToggle = (id: string) => {
    todoStore.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const onModal = (id: string) => {
    // if (show) {
    //   todoStore.update((todos) => todos.filter((todo) => todo.id !== id));
    // }
    show = true;
    removeId = id;
  };

  const onRemove = () => {
    todoStore.update((todos) => todos.filter((todo) => todo.id !== removeId));
  };
</script>

<Modal bind:show content="Process removing ?" on:remove={onRemove} />

<div class="frame">
  <div class="title">Todo List</div>

  <div class="input-area">
    <input
      type="text"
      title="할 일을 입력"
      bind:value={todoText}
      placeholder="Todo"
    />
    <button title="확인" disabled={!todoText} on:click={onAdd}>Add</button>
  </div>

  <!-- {todo} 와 bind:todo 차이점 -->
  <ul>
    {#each todos as todo (todo.id)}
      <!-- content here -->
      <Todo
        bind:todo
        on:edit={() => onEdit(todo)}
        on:toggle={() => onToggle(todo.id)}
        on:modal={() => onModal(todo.id)}
      />
    {/each}
  </ul>

  <div class="store-check">
    {#each $todoStore as todo (todo.id)}
      <div>{todo.text} - {todo.done}</div>
    {/each}
  </div>
</div>

<style>
  .frame {
    margin: 0.25rem auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    /* background-color: gray; */
  }

  .title {
    text-align: center;
    font-size: 5rem;
    font-weight: bold;
    color: #88aaff;
  }

  .input-area {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 90%;
    padding: 1rem;
    margin-top: 1rem;
    /* background-color: orange; */
  }

  input {
    border: none;
    outline: none;
    border-bottom: 1px solid black;
    font-size: 1.5rem;
    margin: auto 1rem;
    width: 500px;
  }

  button {
    border: none;
    border-radius: 0.25rem;
    font-size: 1.5rem;
    margin: auto 0.25rem;
    padding: 0.25rem 0.5rem;
    background-color: #2c54b8;
    color: white;
  }

  button:hover {
    background-color: lightgreen;
  }

  button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }

  ul {
    list-style: none;
    height: 300px;
    width: 90%;
    border: 1px solid black;
    padding: 1rem;
    overflow: auto;
  }

  .store-check {
    font-weight: 600;
    color: #2c54b8;
  }
</style>
