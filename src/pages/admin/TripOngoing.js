import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { toast, ToastContainer } from "react-toastify";

const transformTripOngoing = (data, data2, data3) => {
  const transformedData = [];

  if (data && data2) {
    for (const uid in data) {
      if (data.hasOwnProperty(uid) && data2.hasOwnProperty(uid)) {
        const userData = data[uid];
        const userData2 = data2[uid];

        if (
          userData2 &&
          userData2.max_speed !== undefined &&
          userData2.current_speed !== undefined
        ) {
          // Both max_speed and current_speed are defined, so include this row
          const mappedData = {
            id: uid,
            maxSpeed: userData2.max_speed ?? 0,
            currentSpeed: userData2.current_speed ?? 0,
            datetime: userData.date,
            averageSpeed: userData2.average_speed,
            harshBraking: userData2.harsh_braking_count ?? 0,
            suddenAcceleration: userData2.sudden_acceleration_count ?? 0,
          };

          transformedData.push(mappedData);
        }
      }
    }
  }

  return transformedData;
};

export default function TripOngoing({ onFindClick }) {
  const [rowsTripOngoing, setRowsTripOngoing] = useState([]);
  const columnsTripOngoing = [
    { field: "id", headerName: "Driver name", flex: 1.5 },
    { field: "datetime", headerName: "Date and Time", flex: 1.5 },
    { field: "currentSpeed", headerName: "Current Speed", flex: 1 },
    { field: "averageSpeed", headerName: "Avg Speed", flex: 1 },
    { field: "maxSpeed", headerName: "Max Speed", flex: 1 },
    { field: "harshBraking", headerName: "Harsh Braking", flex: 1 },
    { field: "suddenAcceleration", headerName: "Sudden Acceleration", flex: 1 },
    {
      field: "track",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          endIcon={<ArrowRightAltIcon />}
          onClick={() => {
            onFindClick(params.row.uid);
          }}
        >
          Find
        </Button>
      ),
    },
  ];

  const fetchTripOngoing = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetch-tripDash");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const fetchTripOngoingSpeed = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetch-speed");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const fetchTripOngoingLocation = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetch-location");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const tripData = await fetchTripOngoing();
      const speedData = await fetchTripOngoingSpeed();
      const locationData = await fetchTripOngoingLocation();

      // Now, update the state with the transformed data
      const updatedData = transformTripOngoing(
        tripData,
        speedData,
        locationData
      );
      setRowsTripOngoing(updatedData);
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [onFindClick]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowsTripOngoing}
        columns={columnsTripOngoing}
        pageSize={5}
      />
    </div>
  );
}
