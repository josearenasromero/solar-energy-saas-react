import { Schedule } from "@/models/Schedule";
import { ApiRequest, api, getAll, getById } from "./api";

const apiUrl = `${api}/solar/schedules`;

interface SchedulesRequest extends ApiRequest {
  company_id?: string;
  utility_id?: string;
  plant_id?: string;
}

export async function fetchSchedules(
  query?: SchedulesRequest
): Promise<Schedule[]> {
  return getAll(apiUrl, query);
}

export async function getSchedule(id: string): Promise<Schedule> {
  return getById(apiUrl, id);
}
