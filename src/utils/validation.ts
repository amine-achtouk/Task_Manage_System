import type { User } from "../types/user";
import type { Task } from "../types/task";

export const isAdminOrManager = (user: User) => {
  return user.role === "admin" || user.role === "manager"
}
export const isUser = (user: User) => {
  return user.role === "user"
}

export  const canEditTask = (user: User, task: Task) => {
  if(isAdminOrManager(user)){
    return true
  }
  if(isUser(user)){
    return user.id === task.assignedTo.id
  }
  return false;
 }