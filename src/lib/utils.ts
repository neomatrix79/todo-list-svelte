import { v4 as uuidv4 } from "uuid";
import { writable } from "svelte/store";
import type { TodoType } from "./types";

export function getGuid() {
  return uuidv4();
}

export function addTodo(text: string, done: boolean = false) {
  return { id: getGuid(), text, done };
}

// sessionStorage : 세션이 유지되는 동안 (즉, 창을 닫지 않는 한)
// localStorage : 창을 닫아도 값이 유지

function save(key: string, value: any) {
  // sessionStorage.setItem(key, JSON.stringify(value));
  localStorage.setItem(key, JSON.stringify(value));
}

export function writableSession(key: string, initValue: TodoType[]) {
  // const sessionValue = JSON.parse(sessionStorage.getItem(key));
  const sessionValue = JSON.parse(localStorage.getItem(key));

  if (!sessionValue) {
    save(key, initValue);
  }

  const store = writable<TodoType[]>(sessionValue || initValue);

  store.subscribe((value) => save(key, value));

  return store;
}
