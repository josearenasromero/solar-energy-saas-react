import { ApiModel } from "./ApiModel";

export interface ScheduleEnergyTime extends ApiModel {
    pending: string;
    schedule_id: number;
    real_schedule_id: string;
    description: string;
    rate_kwh: string;
    min_kv: string;
    max_kv: string;
    determinant: string;
    season: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    max_temp: string;
    min_temp: string;
    charge_unit: string;
    time_of_day: string;
}
