import { Inverter } from "@/models/Inverter";
import { ApiRequest, api, getAll, getById, update } from "./api";

const apiUrl = `${api}/solar/inverters`;

interface InvertersRequest extends ApiRequest {
  company_id?: string,
}

export async function fetchInverters(query?: InvertersRequest): Promise<Inverter[]> {
  return getAll(apiUrl, query);
}

export async function getInverter(id: string): Promise<Inverter> {
  return getById(apiUrl, id);
}

export async function updateInverter(inverter: Partial<Inverter>): Promise<Inverter> {
  return update(`${apiUrl}/${inverter.id}`, inverter);
}