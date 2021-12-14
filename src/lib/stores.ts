import { writable } from "svelte/store";
import { getGuid, addTodo, writableSession } from "./utils";
import type { TodoType } from "./types";

// export const todoStore = writable<TodoType[]>([
// addTodo("Write the report", true),
// addTodo("Take a walk", false),
// addTodo("Baking the bread"),
// ]);

export const todoStore = writableSession("todos", [
  addTodo("Write the report", true),
  addTodo("Take a walk", false),
  addTodo("Baking the bread"),
]);
