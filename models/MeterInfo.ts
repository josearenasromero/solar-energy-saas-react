import { ApiModel } from "./ApiModel";

export interface MeterInfo extends ApiModel {
    bill_start_date: string;
    bill_end_date: string;
    bill_season: string;
    net_on_peak: string;
    net_part_peak: string;
    net_off_peak: string;
}
export interface MeterFilterData {
    meter_id?: string;
    start_date?: Date;
    end_date?: Date;
    schedule_id?: string;
}
