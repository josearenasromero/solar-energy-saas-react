"use client";
import { Plant } from "@/models/Plants";
import { fetchCompanies } from "@/services/companies";
import { Autocomplete, Button, Grid, InputLabel, TextField } from "@lib/mui";
import { Company } from "@models/Company";
import { StatementsFilterData } from "@models/Statement";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

interface GridFiltersProps {
  searchCallback: (filters: any) => void;
  plant?: Plant;
}

const GridFilters: React.FC<GridFiltersProps> = (props) => {
  const currentDate = new Date();
  const previosDate = new Date();
  const prevYearMonth = new Date(
    previosDate.setFullYear(previosDate.getFullYear() - 1)
  );
  const prevMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
  const prevDate = new Date(
    prevYearMonth.setMonth(prevYearMonth.getMonth() - 1)
  );
  const startTestDate = new Date("2023-09-17 00:00:00");
  const endTestDate = new Date("2023-10-17 23:59:59");
  const timeFormat = "YYYY-MM-DD HH:mm:ss";
  const [companies, setCompanies] = useState([] as Company[]);
  const [filterData, setFilterData] = useState<StatementsFilterData>({
    start_date: startTestDate,
    end_date: endTestDate,
    plant_id: props.plant?.id,
  });

  useEffect(() => {
    const fetchData = async () => {
      const companiesData: any = await fetchCompanies({});
      setCompanies(companiesData.items);
      //TODO CHECK THIS!!!
      // props.searchCallback(filterData);
    };

    if (props.plant?.id) {
      fetchData();
    }
  }, [props, filterData]);

  return (
    <Grid container mb={2} justifyContent={"space-between"}>
      <Grid item xs={12} sm={12} md={3} lg={3} mt={3}>
        {!props.plant && (
          <Autocomplete
            onChange={(event, value) => {
              if (value) {
                setFilterData({ ...filterData, company_id: value.id });
              }
            }}
            disablePortal
            fullWidth
            id="combo-box-demo"
            options={companies}
            getOptionLabel={(option) => `${option.name}`}
            renderInput={(params) => <TextField {...params} label="Company" />}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {`${option.name}`}
                </li>
              );
            }}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <InputLabel>Start Date:</InputLabel>
            <DateTimePicker
              value={dayjs(filterData.start_date)}
              onChange={(date: any | null) => {
                if (date) {
                  setFilterData({
                    ...filterData,
                    start_date: date.format(timeFormat),
                  });
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <InputLabel>End Date:</InputLabel>
            <DateTimePicker
              value={dayjs(filterData.end_date)}
              onChange={(date: any | null) => {
                if (date) {
                  setFilterData({
                    ...filterData,
                    end_date: date.format(timeFormat),
                  });
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} mt={3}>
            <Button
              style={{ float: "right", height: "100%" }}
              onClick={() => {
                props.searchCallback({
                  company_id: filterData.company_id,
                  start_date: filterData.start_date,
                  end_date: filterData.end_date,
                  plant_id: props.plant?.id,
                });
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GridFilters;
