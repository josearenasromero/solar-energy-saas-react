import { ApiModel } from "./ApiModel";
import { Plant } from "./Plants";

export interface Statement extends ApiModel {
  plant: Plant;
  total_usage: string;
  net_usage: string;
  bill_w_o_solar: string;
  bill_w_solar: string;
  savings: string;
}

export interface StatementsFilterData {
  company_id?: string;
  plant_id?: string;
  start_date: Date;
  end_date: Date;
}
