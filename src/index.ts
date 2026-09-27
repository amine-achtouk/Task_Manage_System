import { createUser, getUserById } from './services/userService';
import { createTask, findTasksByUser } from './services/taskService';
import { canEditTask } from './utils/validation';
import type { User } from './types/user';
import type { Task } from './types/task';

// Exemple d'utilisation
const adminUser: User = createUser({
  id: 1,
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
});

const myTask: Task = createTask({
  id: 101,
  title: "Setup Architecture",
  status: "todo",
  priority: "high",
  assignedTo: adminUser,
  createdAt: new Date(),
});

console.log("Permission d'édition :", canEditTask(adminUser, myTask));