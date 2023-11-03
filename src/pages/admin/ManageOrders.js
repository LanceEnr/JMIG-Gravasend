import React, { useState, useEffect, useCallback } from "react";
import { Paper } from "@mui/material";
import FullFeaturedCrudGrid from "./components/OrderDataGrid";
import { rowsManageOrders } from "./helpers/data";

function ManageOrders() {
  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchCustomerName() {
      try {
        const response = await fetch("http://localhost:3001/get-customers");
        if (response.ok) {
          const data = await response.json();
          const customerNames = data.map(
            (customer) => `${customer._fName}_${customer._lName}`
          );

          setCustomers(customerNames);
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }

    fetchCustomerName();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3001/get-products");
        if (response.ok) {
          const data = await response.json();
          const productNames = data.map((p) => `${p._itemName}`);

          setProduct(productNames);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const columnsManageOrders = [
    { field: "id", headerName: "Receipt No.", flex: 2 },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: customers,
    },
    {
      field: "product",
      headerName: "Product Name",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: product,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      editable: true,
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      valueGetter: (params) => {
        const price = params.row.price;
        const quantity = params.row.quantity;
        return price * quantity;
      },
    },
    {
      field: "orderDet",
      headerName: "Order Details",
      flex: 2,
      editable: true,
    },
    {
      field: "lastUpdated",
      headerName: "Last Updated",
      type: "datetime",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "Available for pickup-PANDI",
        "Available for pickup-MindanaoAve.",
        "Cancelled",
        "Arrived at Pandi",
        "Pending",
        "Arrived at MindanaoAve.",
        "Delayed",
        "Fetch from quarry",
      ],
    },
  ];
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <FullFeaturedCrudGrid
          title="Manage Orders"
          columns={columnsManageOrders}
          rows={rowsManageOrders}
        />
      </Paper>
    </div>
  );
}

export default ManageOrders;
