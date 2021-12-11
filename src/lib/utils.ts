import { v4 as uuidv4 } from "uuid";

export function getGuid() {
  return uuidv4();
}

export function addTodo(text: string, done: boolean = false) {
  return { id: getGuid(), text, done };
}
