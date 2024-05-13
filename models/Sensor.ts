import { ApiModel } from "./ApiModel";
import { Inverter } from "./Inverter";

export interface Sensor extends ApiModel {
  inverter_id: string;
  name: string;
  description: string;
  formula: string;
  referent: string;
  sampling: string;
  day_aggregation: string;
  month_aggregation: string;
  unit: string;
  sensor_type: string;
  inverter: Inverter
}
