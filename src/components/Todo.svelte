<script lang="ts">
  import type { TodoType } from "../lib/types";
  import { slide, SlideParams } from "svelte/transition";
  import { quadIn } from "svelte/easing";
  import { createEventDispatcher } from "svelte";

  export let todo: TodoType = null;

  let readonly = true;
  let inputElem: HTMLInputElement = null;
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
    // dispatch("remove");
    dispatch("modal");
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

  const onToggle = () => {
    todo.done = !todo.done;
    console.log(`toggle: ${todo.done}`);
    dispatch("toggle");
  };

  const option: SlideParams = {
    duration: 500,
    easing: quadIn,
  };
</script>

<li transition:slide={option}>
  <input
    type="checkbox"
    title="완료여부"
    bind:checked={todo.done}
    on:change={onToggle}
  />
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

  /* PC (해상도 1024px)*/
  @media all and (min-width: 1024px) {
  }

  /* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
  }

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    input[type="checkbox"] {
      width: 30px;
      height: 30px;
    }

    input[type="text"] {
      width: 90%;
      font-size: 12px;
      margin-left: 0.5rem;
      padding-left: 1rem;
    }

    .icon-edit {
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 1rem;
      font-weight: bold;
      color: #ff3d00;
    }

    .icon-trash {
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 1rem;
      font-weight: bold;
      color: cadetblue;
    }
  }
</style>
