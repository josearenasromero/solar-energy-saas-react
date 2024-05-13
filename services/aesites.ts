
import { ApiRequest, api, getAll, update } from "./api";
import { AESites } from "@/models/AESites";

const apiUrl = `${api}/also-energy/sites`;

interface AESitesRequest extends ApiRequest {
    company_id?: string;
}

export async function fetchAESites(
  query?: AESitesRequest
): Promise<AESites[]> {
  return getAll(apiUrl, query);
}


