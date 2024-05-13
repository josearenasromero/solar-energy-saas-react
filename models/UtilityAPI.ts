import { ApiModel } from "./ApiModel";
import { Schedule } from "./Schedule";

export interface UtilityAPI extends ApiModel {
  name: string;
  utility_id: string;
  state: string;
  schedules: Schedule[];
}
