import { v4 as uuidv4 } from "uuid";
// import { writable } from "svelte/store";
import type { TodoType } from "./types";
import { todoStore } from "./stores";

export function getGuid() {
  return uuidv4();
}

export function addTodo(text: string, done: boolean = false) {
  return { id: getGuid(), text, done };
}

export function onAdd2(todoText: string) {
  todoStore.update((todos) => todos.concat(addTodo(todoText)));
}

export function onEdit2(newTodo: TodoType) {
  todoStore.update((todos) =>
    todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
  );
}

export function onToggle2(id: string) {
  todoStore.update((todos) =>
    todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
  );
}

export function onRemove2(id: string) {
  todoStore.update((todos) => todos.filter((todo) => todo.id !== id));
}

// function save(key: string, value: any) {
//   // sessionStorage.setItem(key, JSON.stringify(value));
//   localStorage.setItem(key, JSON.stringify(value));
// }

// export function writableSession(key: string, initValue: TodoType[]) {
//   // const sessionValue = JSON.parse(sessionStorage.getItem(key));
//   const sessionValue = JSON.parse(localStorage.getItem(key));

//   if (!sessionValue) {
//     save(key, initValue);
//   }

//   const store = writable<TodoType[]>(sessionValue || initValue);

//   store.subscribe((value) => save(key, value));

//   return store;
// }
