"use client";
import CustomGrid from "@/components/grid/grid";
import { GridCellParams, GridColDef } from "@lib/grid";
import { Button, Grid } from "@lib/mui";
import { ExtractionLog } from "@models/ExtractionLog";
import { fetchExtractionLogs } from "@/services/extraction-logs";
import React, { useEffect, useState } from "react";

interface OptionsCellProps {
    row: GridCellParams["row"];
}

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 150 },
    { field: "entity_name", headerName: "Entity Name", flex: 1, minWidth: 150 },
    { field: "attempt", headerName: "Attempts", flex: 1, minWidth: 150 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 150 },
    { field: "message", headerName: "Message", flex: 1, minWidth: 150 },
    { field: "start_extracted_date", headerName: "Start Extracted Date", flex: 1, minWidth: 150 },
    { field: "end_extracted_date", headerName: "End Extracted Date", flex: 1, minWidth: 150 },
    { field: "attempt_date", headerName: "Attemp Date", flex: 1, minWidth: 150 },
    { field: "table_name", headerName: "Table Name", flex: 1, minWidth: 150 },
    { field: "key_name", headerName: "Key Name", flex: 1, minWidth: 150 },
    { field: "key_value", headerName: "Key Value", flex: 1, minWidth: 150 },
];

interface ExtractionLogsGridProps {
    id?: string;
}

const ExtractionLogsGrid: React.FC<ExtractionLogsGridProps> = (props) => {
    //add checkbox to select key value from fetchExtractionLogs
    const [extractionLogs, setExtractionLogs] = useState([] as ExtractionLog[]);
    useEffect(() => {
        const fetchData = async () => {
            const logsData: any = await fetchExtractionLogs(props);
            console.log("logsData", logsData);
            setExtractionLogs(logsData.items);
        };
        fetchData();
    }, [props]);

    return extractionLogs ? (
        <CustomGrid rows={extractionLogs} columns={columns} />
    ) : (
        ""
    );
};

export default ExtractionLogsGrid;
