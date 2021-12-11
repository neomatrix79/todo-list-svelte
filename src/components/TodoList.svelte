<script lang="ts">
  import { todoStore } from "../lib/stores";
  import type { TodoType } from "../lib/types";
  import { addTodo } from "../lib/utils";
  import Todo from "./Todo.svelte";

  let todoText = "";
  let todos: TodoType[];

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
        on:remove={() => onRemove(todo.id)}
      />
    {/each}
  </ul>

  {#each $todoStore as todo (todo.id)}
    <!-- content here -->
    <div class="store-check">{todo.text} - {todo.done}</div>
  {/each}
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
