import { ApiModel } from "./ApiModel";

export interface ScheduleIncrementalEnergy extends ApiModel {
    pending: string;
    schedule_id: number;
    real_schedule_id: string;
    description: string;
    rate_kwh: string;
    start_kwh: string;
    end_kwh: string;
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
