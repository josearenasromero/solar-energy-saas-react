import { ApiModel } from "@models/ApiModel";
import { getSession } from "next-auth/react";

export interface ApiRequest {
  page?: string;
  limit?: string;
}

// export const api = `http://127.0.0.1:8000/v2`;
export const api = `https://api.coldwell.anala.us/v2`;
const getHeaders = async () => {
  const session: any = await getSession();
  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${session?.user.accessToken}`,
  };
};

export async function getAll<T extends ApiModel>(
  apiUrl: string,
  query?: ApiRequest
): Promise<T[]> {
  try {
    const result = await (
      await fetch(
        `${apiUrl}?` + new URLSearchParams(JSON.parse(JSON.stringify(query))),
        {
          method: "GET",
          cache: "no-store",
          headers: await getHeaders(),
        }
      )
    ).json();

    return result.data;
  } catch (e) {
    console.log(e);
    //TODO Display alert
    return [];
  }
}

export async function getById<T extends ApiModel>(
  apiUrl: string,
  id: string
): Promise<T> {
  try {
    const result = await (
      await fetch(`${apiUrl}/${id}`, {
        method: "GET",
        cache: "no-store",
        headers: await getHeaders(),
      })
    ).json();

    return result.data;
  } catch (e) {
    //TODO Display alert
    return {} as T;
  }
}

export async function update<T extends ApiModel>(
  apiUrl: string,
  data: Partial<T>
): Promise<T> {
  try {
    const result = await (
      await fetch(`${apiUrl}`, {
        method: "PATCH",
        cache: "no-store",
        body: JSON.stringify(data),
        headers: await getHeaders(),
      })
    ).json();

    return result.data;
  } catch (e) {
    //TODO Display alert
    return {} as T;
  }
}

export async function create<T extends ApiModel>(
  apiUrl: string,
  data: T
): Promise<T> {
  try {
    const result = await (
      await fetch(`${apiUrl}`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify(data),
        headers: await getHeaders(),
      })
    ).json();

    return result.data;
  } catch (e) {
    //TODO Display alert
    return {} as T;
  }
}
