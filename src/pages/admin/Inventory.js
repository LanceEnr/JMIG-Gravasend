import React, { useEffect, useState } from "react";
import { Paper, Box, Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "./components/CustomDataGrid";
import IncomingDataGrid from "./components/IncomingDataGrid";
import Title from "./components/Title";
import axios from "axios";
import {
  columnsCurrentInventory,
  rowsCurrentInventory,
  columnsIncomingInventory,
  rowsIncomingInventory,
  columnsOutgoingInventory,
  rowsOutgoingInventory,
} from "./helpers/data";

function Inventory() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3001/fetch-add");
        if (response.ok) {
          const data = await response.json();

          // Make a request to /addStocks with the entire data array
          const addStocksResponse = await fetch(
            "http://localhost:3001/addStocks",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          if (addStocksResponse.ok) {
            const addStocksData = await addStocksResponse.json();
          } else {
            console.error("Failed to add stocks");
          }
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    async function UpdateStatus() {
      try {
        const response = await fetch("http://localhost:3001/fetch-add");
        if (response.ok) {
          const data = await response.json();

          // Make a request to /addStocks with the entire data array
          const addStocksResponse = await fetch(
            "http://localhost:3001/update-TripHistory",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          if (addStocksResponse.ok) {
            const addStocksData = await addStocksResponse.json();
          } else {
            console.error("Failed to add stocks");
          }
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    UpdateStatus();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Inventory</Title>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Maintenance"
            >
              <Tab label="Current" />
              <Tab label="Incoming" />
              <Tab label="History" />
            </Tabs>
          </Box>
          {value === 0 && (
            <FullFeaturedCrudGrid
              columns={columnsCurrentInventory}
              rows={rowsCurrentInventory}
            />
          )}
          {value === 1 && (
            <IncomingDataGrid
              columns={columnsIncomingInventory}
              rows={rowsIncomingInventory}
            />
          )}
          {value === 2 && (
            <IncomingDataGrid
              columns={columnsOutgoingInventory}
              rows={rowsOutgoingInventory}
            />
          )}
        </Box>
      </Paper>
    </div>
  );
}

export default Inventory;
