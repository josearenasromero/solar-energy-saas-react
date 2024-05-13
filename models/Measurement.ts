import { ApiModel } from "./ApiModel";

export interface Measurement extends ApiModel {
  qos_sensor_id: string;
  collected_at: Date;
  timezone: string;
  value: number;
}
