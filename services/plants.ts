import { Plant } from "@/models/Plants";
import { ApiRequest, api, getAll, getById, update } from "./api";

const apiUrl = `${api}/solar/plants`;

interface PlantsRequest extends ApiRequest {
  company_id?: string,
}

export async function fetchPlants(query?: PlantsRequest): Promise<Plant[]> {
  return getAll(apiUrl, query);
}

export async function getPlant(id: string): Promise<Plant> {
  return getById(apiUrl, id);
}

export async function updatePlant(
  plant: Partial<Plant>
): Promise<Plant> {
  return update(`${apiUrl}/${plant.id}`, plant);
}