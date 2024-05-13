import { ApiModel } from "./ApiModel";

export interface Rate extends ApiModel {
  name: string;
  type: string;
  amount: string;
  start_time: string;
  end_time: string;
  days: string[];
}
