import { ApiModel } from "./ApiModel";

export interface Authorization extends ApiModel {
  email: string;
  user_id: string;
  name: string;
  utilityapi_id: string;
  utility_id: string;
  utility: string;
}
