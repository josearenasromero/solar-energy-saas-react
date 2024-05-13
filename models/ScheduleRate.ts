import { ApiModel } from "./ApiModel";

export interface ScheduleRate extends ApiModel {
  schedule_id: number;
  real_schedule_id: string;
  description: string;
  rate_kwh: string;
  min_kv: string;
  max_kv: string;
  determinant: string;
  charge_unit: string;
  pending: string;
}
