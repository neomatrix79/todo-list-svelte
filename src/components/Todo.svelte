<script lang="ts">
  import type { TodoType } from "../lib/types";
  import { slide, FadeParams } from "svelte/transition";
  import { quadIn } from "svelte/easing";
  import { createEventDispatcher } from "svelte";

  export let todo: TodoType = undefined;

  let readonly = true;
  let inputElem: HTMLInputElement = undefined;
  const dispatch = createEventDispatcher();

  const onInit = (e: HTMLInputElement) => {
    inputElem = e;
  };

  const onEdit = () => {
    readonly = false;

    if (inputElem) {
      // inputElem.setSelectionRange(0, -1); // input 요소의 처음~마지막 값을 블락 선택
      inputElem.selectionEnd = -1; // 커서를 블락 지정된 값의 마지막으로 이동 시킴
      inputElem.focus();
    }
  };

  const onRemove = () => {
    // dispatch("remove", { id: todo.id });
    dispatch("remove");
  };

  const onBlur = (e: KeyboardEvent) => {
    const { code } = e;
    const elem = e.target as HTMLInputElement;

    if (code === "Enter" || code === "Escape" || code === "Tab") {
      readonly = true;
      elem.blur();
      // dispatch("edit", { todo });
      dispatch("edit");
    }
  };

  const option: FadeParams = {
    duration: 500,
    easing: quadIn,
  };
</script>

<li transition:slide={option}>
  <input type="checkbox" title="완료여부" bind:checked={todo.done} />
  <input
    type="text"
    name="todo"
    class="strike-{todo.done} edit-{!readonly}"
    title="할 일"
    bind:value={todo.text}
    use:onInit
    on:keydown={onBlur}
    {readonly}
  />
  <button title="수정" class="icon-edit" on:click={onEdit}>&#10000;</button>
  <button title="삭제" class="icon-trash" on:click={onRemove}>&#128465;</button>
</li>

<style>
  li {
    display: flex;
    align-items: center;
  }

  input {
    margin-right: 1rem;
  }

  input[type="text"] {
    width: 50rem;
    font-size: 1.5rem;
    margin-left: 1.5rem;
    padding-left: 1rem;
  }

  .edit-true {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }

  input[type="checkbox"] {
    width: 30px;
    height: 30px;
  }

  .strike-true {
    text-decoration: line-through;
    text-decoration-color: red;
    text-decoration-thickness: 0.25rem;
  }

  button {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }

  button:hover {
    /* background-color: rgb(172, 167, 167); */
    color: greenyellow;
  }

  .icon-edit {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 2rem;
    font-weight: bold;
    color: #ff3d00;
  }

  .icon-trash {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 2rem;
    font-weight: bold;
    color: cadetblue;
  }
</style>
