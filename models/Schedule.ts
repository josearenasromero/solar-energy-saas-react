import { ApiModel } from "./ApiModel";

export interface Schedule extends ApiModel {
  pending: string,
  utility_id: string,
  schedule_name: string,
  name: string,
  schedule_description: string,
  use_type: string,
  min_demand: string,
  max_demand: string,
  min_usage: string,
  max_usage: string,
  effective_date: string,
  option_type: string,
  option_description: string,
  schedule_id: string,
}
