# Task Manager

A small in-memory task & user management example, written in TypeScript and organized into a layered structure.

## Project Structure

```
├── src
│   ├── data
│   │   ├── tasks.ts        # In-memory task store + raw CRUD (no permission logic)
│   │   └── users.ts        # In-memory user store + raw CRUD
│   ├── services
│   │   ├── taskService.ts  # Business logic: wraps data/tasks.ts, enforces canEditTask
│   │   └── userService.ts  # Business logic: wraps data/users.ts
│   ├── types
│   │   ├── api.ts          # ApiResponse<T, E>
│   │   ├── task.ts         # Task, Status, Priority
│   │   └── user.ts         # User, Role, Identifiable
│   ├── utils
│   │   ├── result.ts       # Result / Success / Failure generic types
│   │   └── validation.ts   # isAdminOrManager, isUser, canEditTask
│   └── index.ts            # Entry point / usage example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## How the original code was split

The original file was one flat script mixing types, in-memory arrays, CRUD functions, and permission logic. It was divided by **responsibility**:

| Original content | New location | Why |
|---|---|---|
| `Role`, `Identifiable`, `User` | `types/user.ts` | Pure type definitions for the user domain |
| `Status`, `Priority`, `Task` | `types/task.ts` | Pure type definitions for the task domain (imports `User`) |
| `ApiResponse<T, E>` | `types/api.ts` | Shared API contract type |
| `Success`, `Failure`, `Result` | `utils/result.ts` | Generic, reusable helper types not tied to any one domain |
| `isAdminOrManager`, `isUser`, `canEditTask` | `utils/validation.ts` | Pure, side-effect-free logic reused by services |
| `users` array + `createUser`, `getUserById`, `updateUser`, `deleteUser`, `findUserByEmail` | `data/users.ts` | The raw "storage" layer — knows nothing about permissions |
| `tasks` array + `createTask`, `getTaskById`, `updateTask`, `deleteTask`, `findTasksBy*` | `data/tasks.ts` | The raw "storage" layer for tasks |
| — (new) | `services/userService.ts` | Thin layer that exposes the user API to the rest of the app |
| — (new) | `services/taskService.ts` | Wraps `data/tasks.ts` and applies `canEditTask` before allowing update/delete |
| — (new) | `index.ts` | Example wiring: creates users/tasks and calls the services |

**Why add a `services` layer that didn't exist before?**
In the original code, `canEditTask` was defined but never actually used to guard `updateTask`/`deleteTask`. Splitting into `data` (dumb storage) vs. `services` (rules) gives that permission check somewhere real to live — `taskService.updateTask` and `taskService.deleteTask` now check `canEditTask` before mutating anything. `data/*.ts` stays a plain, swappable storage layer (easy to later replace with a real database), while `services/*.ts` holds the business rules.

## Setup

```bash
npm install
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run `src/index.ts` directly with `ts-node` |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled output from `dist/index.js` |

## Notes

- Data is stored in memory only (plain arrays) — everything resets on restart. Swap `data/users.ts` / `data/tasks.ts` for real persistence later without touching `services/*` or `index.ts`.
- `updateTask` in the original code took `Omit<Task, "id">` (a full task object minus `id`) rather than a partial update, so that signature was kept as-is in `data/tasks.ts` and `services/taskService.ts`.