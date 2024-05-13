import { Schedule } from "@/models/Schedule";
import { ApiRequest, api, getAll } from "./api";

const apiUrl = `${api}/solar/schedule-incremental-energy`;

interface SchedulesIncrementalEnergyRequest extends ApiRequest {
  schedule_id?: string;
}

export async function fetchSchedulesIncrementalEnergy(
  query?: SchedulesIncrementalEnergyRequest
): Promise<Schedule[]> {
  return getAll(apiUrl, query);
}
