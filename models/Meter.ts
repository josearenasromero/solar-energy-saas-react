import { ApiModel } from "./ApiModel";
import { Authorization } from "./Authorization";
import { Schedule } from './Schedule';

export interface Meter extends ApiModel {
    utilityapi_meter_id: string;
    service_class: string;
    service_tariff: string;
    service_address: string;
    service_identifier: string;
    meter_numbers: string;
    billing_account: string;
    billing_address: string;
    billing_contact: string;
    authorization: Authorization;
    schedule: Schedule;
}
