import { Meter } from "@/models/Meter";
import { ApiRequest, api, getAll, update } from "./api";

const apiUrl = `${api}/solar/meters`;

interface MetersRequest extends ApiRequest {
  authorization_id?: number;
}

export async function fetchMeters(query?: MetersRequest): Promise<Meter[]> {
  return getAll(apiUrl, query);
}
export async function updateMeter(
  meter: Partial<Meter>
): Promise<Meter> {
  return update(`${apiUrl}/${meter.id}`, meter);
}

export async function removeMeter(
  meter: Partial<Meter>
): Promise<Meter> {
  return update(`${apiUrl}/remove/${meter.id}`, meter);
}