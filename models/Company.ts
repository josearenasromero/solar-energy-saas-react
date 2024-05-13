import { ApiModel } from "./ApiModel";
import { Authorization } from "./Authorization";
import { Inverter } from "./Inverter";
import { Schedule } from "./Schedule";
import { UtilityAPI } from "./UtilityAPI";

export interface Company extends ApiModel {
  name: string;
  country: string;
  city: string;
  address1: string;
  zip_code: string;
  owner_first_name: string;
  owner_last_name: string;
  owner_email: string;
  qos_site_id: string;
  utility: UtilityAPI;
  authorization_id: number;
  active: boolean;
  authorization: Authorization;
  inverters: Inverter[];
  schedules: Schedule[];
}
