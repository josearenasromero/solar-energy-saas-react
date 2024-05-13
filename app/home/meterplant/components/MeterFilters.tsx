"use client";

import { MeterFilterData } from '@/models/MeterInfo';
import { Button, Grid, InputLabel } from "@lib/mui";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import React, { useState } from "react";

interface GridFiltersProps {
  searchCallback: (filters: any) => void;
  meter_id?: string;
  schedule_id?: string;
}

const MeterFilters: React.FC<GridFiltersProps> = (props) => {
  const currentDate = new Date();
  const previosDate = new Date();
  const prevYearMonth = new Date(
    previosDate.setFullYear(previosDate.getFullYear() - 1)
  );
  const prevMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
  const prevDate = new Date(
    prevYearMonth.setMonth(prevYearMonth.getMonth() - 1)
  );
  const startTestDate = new Date("");
  const endTestDate = new Date("");
  const timeFormat = "YYYY-MM-DD HH:mm:ss";
  const [filterData, setFilterData] = useState<MeterFilterData>({
    start_date: startTestDate,
    end_date: endTestDate,
    meter_id: props.meter_id,
    schedule_id: props.schedule_id,
  });

  return (
    <Grid container mb={2} justifyContent={"space-between"}>
      <Grid item xs={12} sm={12} md={3} lg={3} mt={3}>

      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <InputLabel>Start Date:</InputLabel>
            <DateTimePicker
              views={['year', 'month']}
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
              views={['year', 'month']}
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
                console.log(props);
                props.searchCallback({
                  start_date: filterData.start_date,
                  end_date: filterData.end_date,
                  meter_id: props.meter_id,
                  schedule_id: props.schedule_id,
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

export default MeterFilters;
