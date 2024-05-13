import { Statement } from "typescript";
import { ApiRequest, api, create } from "./api";

const apiUrl = `${api}/solar/statements`;

interface UsersRequest extends ApiRequest {
  // NOTE: Leaving this for future-proofing
}


export async function fetchStatements(data: any): Promise<Statement> {
  return create(`${apiUrl}/report`, data);
}
