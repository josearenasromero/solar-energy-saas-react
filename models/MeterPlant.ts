import { ApiModel } from "./ApiModel";
import { Meter } from './Meter';
import { Schedule } from './Schedule';

export interface MeterPlant extends ApiModel {
    meter: Meter;
    schedule: Schedule;
    plant_id: string;
    is_generator:boolean;
}
