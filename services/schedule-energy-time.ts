import { Schedule } from "@/models/Schedule";
import { ApiRequest, api, getAll } from "./api";

const apiUrl = `${api}/solar/energy-time`;

interface SchedulesEnergyTimeRequest extends ApiRequest {
  schedule_id?: string;
}

export async function fetchSchedulesEnergyTime(
  query?: SchedulesEnergyTimeRequest
): Promise<Schedule[]> {
  return getAll(apiUrl, query);
}
