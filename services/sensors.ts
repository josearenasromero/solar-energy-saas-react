import { Sensor } from "@/models/Sensor";
import { api, getAll, getById, ApiRequest } from "./api";

const apiUrl = `${api}/solar/sensors`;

interface SensorsRequest extends ApiRequest {
  inverter_id?: string,
}

export async function fetchSensors(query?: SensorsRequest): Promise<Sensor[]> {
  return getAll(apiUrl, query);
}

export async function getSensor(id: string): Promise<Sensor> {
  return getById(apiUrl, id);
}
