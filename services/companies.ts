import { Company } from "@/models/Company";
import { ApiRequest, api, getAll, getById, update } from "./api";

const apiUrl = `${api}/solar/companies`;

interface CompaniesRequest extends ApiRequest {
  // NOTE: Leaving this for future-proofing
}

export async function fetchCompanies(
  query?: CompaniesRequest
): Promise<Company[]> {
  return getAll(apiUrl, query);
}

export async function getCompany(id: string): Promise<Company> {
  return getById(apiUrl, id);
}

export async function updateCompany(
  company: Partial<Company>
): Promise<Company> {
  return update(`${apiUrl}/${company.id}`, company);
}
