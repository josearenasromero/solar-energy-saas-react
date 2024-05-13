import { ApiModel } from "./ApiModel";
import { Plant } from "./Plants";
import { DateTime } from "next-auth/providers/kakao";

export interface AESites extends ApiModel {
    ae_site_id: number, 
    // plant_id: number,
    // plant: Plant[],
    name: string,
    latitude: string, 
    longitud: string,
    timezone: string,
    address1: string,
    zip_code: string,
    city: string,
    state: string,
    country: number;
    turn_on_date: DateTime
}
