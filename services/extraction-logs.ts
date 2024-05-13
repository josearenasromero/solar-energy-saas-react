import { ExtractionLog } from "@/models/ExtractionLog";
import { api, getAll, ApiRequest } from "./api";

const apiUrl = `${api}/solar/extraction-log`;

interface ExtractionLogsRequest extends ApiRequest {
    id?: string
}

export async function fetchExtractionLogs(query?: ExtractionLogsRequest): Promise<ExtractionLog[]> {
    return getAll(apiUrl, query);
}
