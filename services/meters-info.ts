
import { MeterInfo } from '@/models/MeterInfo';
import { ApiRequest, api, create } from "./api";

const apiUrl = `${api}/solar/meters`;

interface UsersRequest extends ApiRequest {
  // NOTE: Leaving this for future-proofing
}

export async function fetchMeterInfo(data: any): Promise<MeterInfo> {
  return create(`${apiUrl}/info`, data);
}
