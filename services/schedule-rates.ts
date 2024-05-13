import { Schedule } from "@/models/Schedule";
import { ApiRequest, api, getAll } from "./api";

const apiUrl = `${api}/solar/schedule-rates`;

interface SchedulesRatesRequest extends ApiRequest {
  schedule_id?: string;
}

export async function fetchSchedulesRates(
  query?: SchedulesRatesRequest
): Promise<Schedule[]> {
  return getAll(apiUrl, query);
}
