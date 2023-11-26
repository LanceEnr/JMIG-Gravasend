import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Paper, Box, Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "./components/InspectionDataGrid";
import Title from "./components/Title";
import {
  rowsInspectionScheduling,
  columnsInspectionRecords,
  rowsInspectionRecords,
} from "./helpers/data";
import Typography from "../../components/common/Typography";

function Inspection() {
  const [value, setValue] = useState(0);
  const [plates, setPlates] = useState([]);

  const currentDate = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const formattedDate = currentDate.toLocaleString("en-US", options);

  useEffect(() => {
    async function fetchPlates() {
      try {
        const response = await fetch("http://localhost:3001/fetch-trucks");
        if (response.ok) {
          const data = await response.json();
          const plates = Object.keys(data).map((key) => data[key].plateNo);
          setPlates(plates);
        } else {
          console.error("Failed to fetch plates");
        }
      } catch (error) {
        console.error("Error fetching plates:", error);
      }
    }

    fetchPlates();
  }, []);

  useEffect(() => {
    async function fetchUpcomingInspection() {
      try {
        const response = await fetch(
          "http://localhost:3001/fetch-upcomingInspections"
        );
        if (response.ok) {
          const data = await response.json();

          if (data) {
            for (const uid in data) {
              if (data.hasOwnProperty(uid)) {
                const inspectionData = data[uid];

                for (const id in inspectionData) {
                  if (inspectionData.hasOwnProperty(id)) {
                    const upcomingInspections = inspectionData[id];

                    const nextInspectionDate = new Date(
                      upcomingInspections.nextInspectionDate
                    );
                    const inspectionType = upcomingInspections.inspectionType;
                    const plateNo = upcomingInspections.plateNo;
                    const verdict = upcomingInspections.verdict;

                    const currentDate = new Date();

                    const oneWeekBefore = new Date(nextInspectionDate);
                    oneWeekBefore.setDate(oneWeekBefore.getDate() - 7);

                    const threeDaysBefore = new Date(nextInspectionDate);
                    threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);

                    if (
                      nextInspectionDate <= currentDate &&
                      verdict === "Pending"
                    ) {
                      toast.warning(
                        `Inspection overdue for ${upcomingInspections.plateNo}. Inspection Date: ${nextInspectionDate}`
                      );
                      try {
                        const response = axios.post(
                          "http://localhost:3001/inspection-notif",
                          {
                            plateNo,
                            uid,
                            id,
                            inspectionType,
                            verdict: "overdue",
                            date: formattedDate,
                          }
                        );

                        console.log(
                          "Inspection check successfully",
                          response.data
                        );
                      } catch (error) {
                        console.error("Inspection check failed", error);
                      }
                    } else if (
                      nextInspectionDate == currentDate &&
                      verdict === "Pending"
                    ) {
                      toast.warning(
                        `Inspection for ${upcomingInspections.plateNo} is scheduled today. Inspection Date: ${nextInspectionDate}`
                      );
                      try {
                        const response = axios.post(
                          "http://localhost:3001/inspection-notif",
                          {
                            plateNo,
                            uid,
                            id,
                            inspectionType,
                            verdict: "due",
                            date: formattedDate,
                          }
                        );

                        console.log(
                          "Inspection check successfully",
                          response.data
                        );
                      } catch (error) {
                        console.error("Inspection check failed", error);
                      }
                    } else if (
                      currentDate <= oneWeekBefore &&
                      verdict === "Pending"
                    ) {
                      try {
                        const response = axios.post(
                          "http://localhost:3001/inspection-notif2",
                          {
                            plateNo,
                            uid,
                            id,
                            inspectionType,
                            verdict: "due",
                            date: formattedDate,
                            duration: "1 week",
                          }
                        );

                        console.log(
                          "Inspection check successfully",
                          response.data
                        );
                      } catch (error) {
                        console.error("Inspection check failed", error);
                      }
                      toast.warning(
                        `Inspection due for ${upcomingInspections.plateNo} in one week. Inspection Date: ${nextInspectionDate}`
                      );
                    } else if (
                      currentDate <= threeDaysBefore &&
                      verdict === "Pending"
                    ) {
                      try {
                        const response = axios.post(
                          "http://localhost:3001/inspection-notif2",
                          {
                            plateNo,
                            uid,
                            id,
                            inspectionType,
                            verdict: "due",
                            date: formattedDate,
                            duration: "3 days",
                          }
                        );

                        console.log(
                          "Inspection check successfully",
                          response.data
                        );
                      } catch (error) {
                        console.error("Inspection check failed", error);
                      }
                      toast.warning(
                        `Inspection due for ${upcomingInspections.plateNo} in 3 days. Inspection Date: ${nextInspectionDate}`
                      );
                    }
                  }
                }
              }
            }
          }
        } else {
          console.error("Failed to fetch upcoming inspections");
        }
      } catch (error) {
        console.error("Error fetching upcoming inspections:", error);
      }
    }

    fetchUpcomingInspection();
  }, []);

  const columnsInspectionScheduling = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "plateNo",
      headerName: "PLATE NO.",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: plates,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "inspectionType",
      headerName: "INSPECTION TYPE",
      flex: 2,
      editable: true,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "nextInspectionDate",
      headerName: "INSPECTION DATE",
      type: "date",
      flex: 3,
      editable: true,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "verdict",
      headerName: "VERDICT",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Pending", "On Going", "Pass", "Failed"],
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ my: 12, mx: 6 }}>
        <Typography
          variant="h3"
          marked="left"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          gutterBottom
        >
          Inspection
        </Typography>
        <Paper sx={{ mt: 3, p: 2, display: "flex", flexDirection: "column" }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Scheduling" />
                <Tab label="Records" />
              </Tabs>
            </Box>
            {value === 0 && (
              <FullFeaturedCrudGrid
                columns={columnsInspectionScheduling}
                rows={rowsInspectionScheduling}
              />
            )}
            {value === 1 && (
              <DataGrid
                checkboxSelection
                disableColumnFilter
                disableColumnSelector
                density="comfortable"
                columns={columnsInspectionRecords}
                rows={rowsInspectionRecords}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
              />
            )}
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default Inspection;
