<script lang="ts">
  import { todoStore } from "../lib/stores";
  import type { TodoType } from "../lib/types";
  import { addTodo } from "../lib/utils";
  import Todo from "./Todo.svelte";

  let todoText = "";

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
    todoStore.update((todos) =>
      todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
    );
  };

  const onRemove = (id: string) => {
    todoStore.update((todos) => todos.filter((todo) => todo.id !== id));
  };
</script>

<div class="frame">
  <div class="title">Todo List</div>

  <div class="input-area">
    <input type="text" bind:value={todoText} placeholder="Todo" />
    <button title="입력" disabled={!todoText} on:click={onAdd}>Add</button>
  </div>

  <!-- {todo} 와 bind:todo 차이점 -->
  <ul>
    {#each todos as todo (todo.id)}
      <!-- content here -->
      <Todo
        bind:todo
        on:edit={() => onEdit(todo)}
        on:remove={() => onRemove(todo.id)}
      />
    {/each}
  </ul>

  {#each $todoStore as todo (todo.id)}
    <!-- content here -->
    <div>{todo.text} - {todo.done}</div>
  {/each}
</div>

<style>
  .frame {
    margin: 0.25rem auto;
    display: flex;
    flex-direction: column;
    /* background-color: rgba(0, 0, 0, 0.5); */
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
    width: 100%;
    padding: 1rem;
  }

  input {
    border: none;
    outline: none;
    border-bottom: 1px solid black;
    font-size: 1.5rem;
    margin: auto 2rem;
    width: 500px;
  }

  button {
    border: none;
    border-radius: 0.25rem;
    font-size: 1.5rem;
    margin: auto 1rem;
    padding: 0.25rem 0.5rem;
    background-color: indigo;
    color: white;
  }

  button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }

  ul {
    list-style: none;
    height: 300px;
    border: 1px solid black;
    padding: 1rem;
    overflow: auto;
  }
</style>
