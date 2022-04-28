import { $host } from "."
import { Task } from "../types"

export type getTaskListResponce = {
  status: string
  taskList: Array<Task>
}

export const getTaskList = () => {
  return $host.get<getTaskListResponce>("/task")
}

export type createTaskResponce = {
  status: string
  id: number
}

export const createTask = (task: Task) => {
  return $host.post<createTaskResponce>("/task", task)
}

export const updateTask = (id: number, check: boolean) => {
  let task: Task = { id: id, checked: check, text: "", category: { id: 0, name: "" } }
  return $host.put("/task", task)
}

export const deleteTask = (id: number) => {
  return $host.delete("/task/" + id)
}