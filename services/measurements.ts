import { Measurement } from "@/models/Measurement";
import { api, getAll, ApiRequest } from "./api";

const apiUrl = `${api}/solar/measurements`;

interface MeasurementsRequest extends ApiRequest {
  sensor_id?: string,
}

export async function fetchMeasurements(query?: MeasurementsRequest): Promise<Measurement[]> {
  return getAll(apiUrl, query);
}
