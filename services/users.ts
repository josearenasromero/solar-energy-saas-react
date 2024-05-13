import { User } from "@models/User";
import { ApiRequest, api, create, getAll, getById, update } from "./api";

const apiUrl = `${api}/solar/users`;

interface UsersRequest extends ApiRequest {
  // NOTE: Leaving this for future-proofing
}

export async function fetchUsers(query?: UsersRequest): Promise<User[]> {
  return getAll(apiUrl, query);
}

export async function getUser(id: string): Promise<User> {
  return getById(apiUrl, id);
}

export async function updateUser(user: Partial<User>): Promise<User> {
  return update(`${apiUrl}/update`, user);
}

export async function createUser(user: User): Promise<User> {
  return create(`${apiUrl}/create`, user);
}
