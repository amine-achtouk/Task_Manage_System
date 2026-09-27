import type { User, UpdateUser } from '../types/user'
import { users } from '../data/users'

export const createUser = (user: User) => {
  const newUser: User = { ...user };
  users.push(newUser);
  return newUser;
};

export const getUserById = (id: number) => {
  return users.find((u) => u.id === id);
};

export const updateUser = (id: number, data: UpdateUser): User | null => {
  const user = users.find((u) => u.id === id);

  if (!user) return null;
  return Object.assign(user, data)
};


export const deleteUser = (id: number) => {
  const user = users.findIndex((u) => u.id === id);
  if(user === -1) return null
  users.splice(user, 1)
  return true
}

export const findUserByEmail = (email: string) => {
  return users.find(u => u.email === email)
}
