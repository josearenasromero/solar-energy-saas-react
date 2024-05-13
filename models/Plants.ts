import { AESites } from "./AESites";
import { ApiModel } from "./ApiModel";
import { Authorization } from "./Authorization";
import { Company } from "./Company";
import { Meter } from './Meter';
import { MeterPlant } from './MeterPlant';
import { UtilityAPI } from "./UtilityAPI";

export interface Plant extends ApiModel {
    name: string, 
    type: string,
    peak_power: string,
    commissioning_date: string, 
    computation_start_date: string,
    timeZone: string,
    latitude: string,
    longitud: string,
    company: Company[],
    authorization: Authorization,
    authorization_id: number;
    utility: UtilityAPI,
    meter: Meter[],
    utility_id: number;
    meter_plant: MeterPlant[],
    status: string,
    ae_site: AESites,
    ae_site_id: number
}
