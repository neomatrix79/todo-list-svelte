import { writable } from "svelte/store";
import { getGuid, addTodo } from "./utils";
import type { TodoType } from "./types";

export const todoStore = writable<TodoType[]>([
  addTodo("Write the report", true),
  addTodo("Take a walk", false),
  addTodo("Baking the bread"),
]);
