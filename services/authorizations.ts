import { Authorization } from "@/models/Authorization";
import { ApiRequest, api, getAll, getById } from "./api";

const apiUrl = `${api}/solar/authorizations`;

interface AuthorizationsRequest extends ApiRequest {
  // NOTE: Leaving this for future-proofing
}

export async function fetchAuthorizations(
  query?: AuthorizationsRequest
): Promise<Authorization[]> {
  return getAll(apiUrl, query);
}

export async function getAuthorization(id: string): Promise<Authorization> {
  return getById(apiUrl, id);
}
