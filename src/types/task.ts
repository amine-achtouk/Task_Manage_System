import type { Identifiable } from './api';
import type { User } from './user';

export type Status = "todo" | "in-progress" | "completed";
export type Priority = "low" | "medium" | "high";

export interface Task extends Identifiable {
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assignedTo: User;
  createdAt: Date;
  dueDate?: Date;
}