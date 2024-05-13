import { ApiModel } from "./ApiModel";
import { Company } from "./Company";
import { Meter } from "./Meter";
import { Plant } from "./Plants";

export interface Inverter extends ApiModel {
  company_name: string;
  plant_name: string;
  name: string;
  group: string;
  serial: string;
  manufacturer: string;
  model: string;
  peak_power: string;
  active: string;
  company: Company;
  plant: Plant;
  meter: Meter;
}
