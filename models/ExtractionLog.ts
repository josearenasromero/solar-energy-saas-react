import { ApiModel } from "./ApiModel";

export interface ExtractionLog extends ApiModel {
    id: string;
    entity_name:string;
    attempt:number;
    status:string;
    message:string;
    start_extracted_date:Date;
    end_extracted_date:Date;
    attempt_date:Date;
    table_name:string;
    key_name:string;
    key_value:string;
}

export interface ExtractionLogFilterData {
    entity_name?: string;
    status?: string;
    table_name?: string;
    key_value?: string;
    start_date: Date;
    end_date: Date;
}

