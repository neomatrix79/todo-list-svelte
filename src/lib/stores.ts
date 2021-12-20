// import { writable } from "svelte/store";
// import { addTodo } from "./utils";
import { v4 as uuidv4 } from "uuid";
import type { TodoType } from "./types";
import { writableSession } from "./session";

// export const todoStore = writable<TodoType[]>([
// addTodo("Write the report", true),
// addTodo("Take a walk", false),
// addTodo("Baking the bread"),
// ]);

export function addTodo(text: string, done: boolean = false) {
  return { id: uuidv4(), text, done };
}

export const todoStore = writableSession("todos", [
  addTodo("Write the report", true),
  addTodo("Take a walk", false),
  addTodo("Baking the bread"),
]);
