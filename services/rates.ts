import { Rate } from "@/models/Rate";
import { api, getAll, getById } from "./api";

const apiUrl = `${api}/solar/utilityrates`;

export async function fetchRates(): Promise<Rate[]> {
  return getAll(apiUrl);
}

export async function getRate(id: string): Promise<Rate> {
  return getById(apiUrl, id);
}
