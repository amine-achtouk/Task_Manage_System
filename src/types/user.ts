import type { Identifiable } from "./api"

export type Role = "admin" | "manager" | "user"

export interface User extends Identifiable {
  name: string;
  email: string;
  role: Role;
  age?: number;
}

export type UpdateUser = Partial<Omit<User, "id">>;
