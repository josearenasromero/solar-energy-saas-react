import { UtilityAPI } from "@models/UtilityAPI";
import { ApiRequest, api, getAll } from "./api";

const apiUrl = `${api}/solar/utilities`;

interface UtilitiesRequest extends ApiRequest {
  company_id?: string;
}

export async function fetchUtilities(
  query?: UtilitiesRequest
): Promise<UtilityAPI[]> {
  return getAll(apiUrl, query);
}
