import type { Task, Status, Priority } from '../types/task'
import type { User } from '../types/user'
import { tasks } from '../data/tasks'

export const createTask = (task: Task) => {
  const newTask: Task = { ...task };
  tasks.push(newTask);
  return newTask;
};

export const getTaskById = (id: number) => {
  return tasks.find(t => t.id === id);
};

export const updateTask = (id: number, taskWithoutId: Omit<Task, "id">): Task | null => {
  const task = tasks.find(t => t.id === id);

  if (!task) return null;
  return Object.assign(task, taskWithoutId);
};


export const deleteTask = (id: number) => {
  const task = tasks.findIndex(t => t.id === id);
  if(task === -1) return null
  tasks.splice(task, 1)
  return true;
}

export const findTasksByUser = (user: User) => {
  return tasks.filter( t => t.assignedTo.id === user.id)
}

export const findTasksByStatus = (status: Status) => {
  return tasks.filter(t => t.status === status)
}

export const findTasksByPriority = (priority: Priority) => {
  return tasks.filter( t => t.priority === priority)
}