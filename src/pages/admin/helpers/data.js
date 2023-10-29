import axios from "axios";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const fetchInventoryData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/currentInventory");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const transformInventoryData = (data) => {
  return data.map((item) => ({
    id: item._inventoryID,
    itemName: item._itemName,
    quantity: item._quantity,
    location: item._location,
    lastUpdated: new Date(item._lastUpdated),
  }));
};

const rowsCurrentInventory = transformInventoryData(await fetchInventoryData());

export { rowsCurrentInventory };

const fetchIncomingInventoryData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/incomingInventory");

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const transformIncomingInventoryData = (data) => {
  return data.map((item) => ({
    id: item._inventoryID,
    itemName: item._itemName,
    quantity: item._quantity,
    sourceLocation: item._location,
    dateReceived: new Date(item._lastUpdated),
  }));
};

const rowsIncomingInventory = transformIncomingInventoryData(
  await fetchIncomingInventoryData()
);

export { rowsIncomingInventory };

const fetchOutgoingInventoryData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/outgoingInventory");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const transformOutgoingInventoryData = (data) => {
  return data.map((item) => ({
    id: item._inventoryID,
    itemName: item._itemName,
    quantity: item._quantity,
    destinationLocation: item._location,
    dateDispatched: new Date(item._lastUpdated),
  }));
};

const rowsOutgoingInventory = transformOutgoingInventoryData(
  await fetchOutgoingInventoryData()
);

export { rowsOutgoingInventory };

const transformFleetData = (data) => {
  const transformedData = [];

  if (data) {
    for (const uid in data) {
      if (data.hasOwnProperty(uid)) {
        const userData = data[uid];

        const mappedData = {
          id: uid,
          driverName: userData.driverName,
          bodyNo: userData.bodyNo,
          plateNo: userData.plateNo,
          plateNo2: userData.plateNo2,
          chassisNo: userData.chassisNo,
          engineNo: userData.engineNo,
          model: userData.model,
          mileage: userData.mileage,
          status: userData.status,
          location: userData.location,
        };

        transformedData.push(mappedData);
      }
    }
  }

  return transformedData;
};

const fetchFleetInformation = async () => {
  try {
    const response = await axios.get("http://localhost:3001/fetch-trucks");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const rowsFleetInformation = transformFleetData(await fetchFleetInformation());

export { rowsFleetInformation };

const transformDriverData = (data) => {
  const transformedData = [];
  console.log(data);
  if (data) {
    for (const uid in data) {
      if (data.hasOwnProperty(uid)) {
        const userData = data[uid];

        const mappedData = {
          id: uid,
          contact: userData.contact,
          date: userData.date,
          driverName: userData.driverName,
          email: userData.email,
          licenseNo: userData.licenseNo,
          plateNo: userData.plateNo,
          status: userData.status,
        };

        transformedData.push(mappedData);
      }
    }
  }

  return transformedData;
};

const fetchDriverInformation = async () => {
  try {
    const response = await axios.get("http://localhost:3001/fetch-driver");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const rowsDriverManagement = transformDriverData(
  await fetchDriverInformation()
);

export { rowsDriverManagement };

export const columnsDriverManagement = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "driverName", headerName: "Name", flex: 1, editable: true },
  { field: "contact", headerName: "Contact", flex: 1, editable: true },
  {
    field: "date",
    headerName: "Hire Date",
    flex: 1,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  { field: "plateNo", headerName: "Plate No.", flex: 1, editable: true },
  { field: "email", headerName: "Email", flex: 1, editable: true },
  { field: "licenseNo", headerName: "License", flex: 1, editable: true },
];

const transformUpcomingInspectionData = (data) => {
  const transformedData = [];
  console.log(data);
  if (data) {
    for (const uid in data) {
      if (data.hasOwnProperty(uid)) {
        const userData = data[uid];

        const mappedData = {
          id: uid,
          plateNo: userData.plateNo,
          inspectionType: userData.type,
          nextInspectionDate: new Date(userData.nextInspection),
          verdict: userData.verdict,
        };

        transformedData.push(mappedData);
      }
    }
  }

  return transformedData;
};

const fetchUpcomingInspection = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/fetch-upcominginspection"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const rowsInspectionScheduling = transformUpcomingInspectionData(
  await fetchUpcomingInspection()
);

export { rowsInspectionScheduling };

export const columnsInspectionScheduling = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "plateNo", headerName: "Plate No.", flex: 2, editable: true },
  {
    field: "inspectionType",
    headerName: "Inspection Type",
    flex: 2,
    editable: true,
  },
  {
    field: "nextInspectionDate",
    headerName: "Next Inspection Date",
    type: "date",
    flex: 3,
    editable: true,
  },
  {
    field: "verdict",
    headerName: "Verdict",
    flex: 2,
    editable: true,
    type: "singleSelect",
    valueOptions: ["On Going", "Pass", "Failed"],
  },
];

const transformInspectionRecordsData = (data) => {
  const transformedData = [];
  console.log(data);
  if (data) {
    for (const uid in data) {
      if (data.hasOwnProperty(uid)) {
        const userData = data[uid];

        const mappedData = {
          id: uid,
          plateNo: userData.plateNo,
          inspectionType: userData.inspectionType,
          inspectionDate: new Date(userData.inspectionDate),
          verdict: userData.verdict,
        };

        transformedData.push(mappedData);
      }
    }
  }

  return transformedData;
};

const fetchInspectionRecords = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/fetch-inspectionrecords"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const rowsInspectionRecords = transformInspectionRecordsData(
  await fetchInspectionRecords()
);

export { rowsInspectionRecords };

export const columnsInspectionRecords = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "plateNo", headerName: "Plate No.", flex: 2 },
  {
    field: "inspectionType",
    headerName: "Inspection Type",
    flex: 2,
    editable: true,
  },
  {
    field: "verdict",
    headerName: "Verdict",
    flex: 2,
  },
  {
    field: "inspectionDate",
    headerName: "Inspection Date",
    type: "date",
    flex: 3,
  },
];

const transformMaintenanceData = (data) => {
  const transformedData = [];
  console.log(data);
  if (data) {
    for (const uid in data) {
      if (data.hasOwnProperty(uid)) {
        const userData = data[uid];

        const mappedData = {
          id: uid,
          plateNo: userData.plateNo,
          service: userData.service,
          frequency: userData.frequency,
          nextDueMileage: userData.nextDueMileage,
          nextMaintenanceDate: new Date(userData.nextMaintenanceDate),
        };

        transformedData.push(mappedData);
      }
    }
  }

  return transformedData;
};

const fetchMaintenance = async () => {
  try {
    const response = await axios.get("http://localhost:3001/fetch-maintenance");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const rowsMaintenanceScheduling = transformMaintenanceData(
  await fetchMaintenance()
);

export { rowsMaintenanceScheduling };

export const columnsMaintenanceScheduling = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "plateNo", headerName: "Plate No.", flex: 2, editable: true },
  { field: "service", headerName: "Service", flex: 2, editable: true },
  {
    field: "frequency",
    headerName: "Frequency",
    flex: 2,
    editable: true,
    type: "singleSelect",
    valueOptions: ["1000", "3000", "5000", "10000", "15000", "20000"],
  },
  {
    field: "nextDueMileage",
    headerName: "Next Due Mileage",
    flex: 2,
  },
  {
    field: "nextMaintenanceDate",
    headerName: "Next Maintenance Date",
    type: "date",
    flex: 2,
    editable: true,
  },
];

const CustomTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowsDriverManagement}
        columns={columnsDriverManagement}
        onRowClick={(params) => handleRowClick(params.id)}
        isRowSelectable={() => false}
        isCellEditable={() => false}
      />
      {expandedRow !== null && (
        <div>
          <p>Additional Information:</p>
          <p>
            Plate Number:{" "}
            {rowsDriverManagement[expandedRow - 1].details.plateNum}
          </p>
          <p>Email: {rowsDriverManagement[expandedRow - 1].details.email}</p>
          <p>
            Password: {rowsDriverManagement[expandedRow - 1].details.password}
          </p>
          <p>
            License No.: {rowsDriverManagement[expandedRow - 1].details.license}
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomTable;

export const columnsMaintenanceRecords = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "plateNo", headerName: "Plate No.", flex: 2 },
  { field: "service", headerName: "Service", flex: 2 },
  {
    field: "serviceProvider",
    headerName: "Service Provider",
    flex: 2,
  },
  {
    field: "totalCost",
    headerName: "Total Cost",
    flex: 2,
  },
];

export const rowsMaintenanceRecords = [
  {
    id: 1,
    plateNo: "ABC123",
    service: "Oil Change",
    serviceProvider: "Service Provider A",
    totalCost: "₱5000",
    verdict: "Pass",
  },
  {
    id: 2,
    plateNo: "XYZ789",
    service: "Tire Rotation",
    serviceProvider: "Service Provider B",
    totalCost: "₱2000",
    verdict: "Failed",
  },
  // Add more rows as needed
];

export const columnsTripVerification = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "driverName", headerName: "Plate No.", flex: 2 },
  {
    field: "dateTime",
    headerName: "Date and Time",
    type: "datetime",
    flex: 2,
  },
  {
    field: "approval",
    headerName: "Approval",
    type: "singleSelect",
    valueOptions: ["Approved", "Rejected", "Pending"],
  },
  {
    field: "verdict",
    headerName: "Verdict",
    flex: 2,
  },
];

export const rowsTripVerification = [
  {
    id: 1,
    plateNo: "ABC123",
    verdict: "Pass",
    inspectionDate: new Date("2024-01-01"),
  },
  {
    id: 2,
    plateNo: "XYZ789",
    verdict: "Fail",
    inspectionDate: new Date("2024-02-01"),
  },
  // Add more rows as needed
];

export const columnsCurrentInventory = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "itemName",
    headerName: "Item Name",
    flex: 2,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 2,
    editable: true,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 2,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Warehouse A", "Warehouse B"],
  },
  {
    field: "lastUpdated",
    headerName: "Last Updated",
    type: "datetime",
    flex: 3,
  },
];

export const columnsIncomingInventory = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "itemName",
    headerName: "Item Name",
    flex: 2,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 2,
    editable: true,
  },
  {
    field: "sourceLocation",
    headerName: "Source Location",
    flex: 2,
    editable: true,
  },
  {
    field: "dateReceived",
    headerName: "Date Received",
    type: "datetime",
    flex: 3,
    editable: true,
  },
];

export const columnsOutgoingInventory = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "itemName",
    headerName: "Item Name",
    flex: 2,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 2,
    editable: true,
  },
  {
    field: "destinationLocation",
    headerName: "Destination Location",
    flex: 2,
    editable: true,
  },
  {
    field: "dateDispatched",
    headerName: "Date Dispatched",
    type: "datetime",
    flex: 3,
    editable: true,
  },
];

export const columnsManageOrders = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 2,
    editable: true,
  },
  {
    field: "contact",
    headerName: "Contact No.",
    flex: 2,
    editable: true,
  },
  {
    field: "orderDate",
    headerName: "Order Date",
    type: "date",
    flex: 1,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 2,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Available for pickup", "Cancelled"],
  },
];

const fetchOrderData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/get-order");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Function to transform the data into the desired format
const transformOrderData = (data) => {
  return data.map((item) => ({
    id: item._orderNum,
    customerName: item._name,
    contact: item._contactNum,
    orderDate: new Date(item._date),
    status: item._status,
  }));
};

// Fetch and transform the data for outgoing inventory
const rowsManageOrders = transformOrderData(await fetchOrderData());

// Export the transformed data
export { rowsManageOrders };

const fetchFAQData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/get-faq");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Function to transform the data into the desired format
const transformFAQData = (data) => {
  return data.map((item) => ({
    id: item._faqNum,
    question: item._question,
    answer: item._answer,
  }));
};

// Fetch and transform the data for outgoing inventory
const rowsFaqs = transformFAQData(await fetchFAQData());

// Export the transformed data
export { rowsFaqs };

export const columnsFaqs = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "question", headerName: "Question", flex: 4, editable: true }, // Increased flex value
  { field: "answer", headerName: "Answer", flex: 4, editable: true },
];

export const columnsUserManagement = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 2, editable: true }, // Increased flex value
  { field: "contact", headerName: "Contact", flex: 1, editable: true },
  {
    field: "joinDate",
    headerName: "Join Date",
    type: "datetime",
    flex: 3,
    editable: true,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Customer", "Admin"],
  },
  { field: "password", headerName: "Password", flex: 1 },
];

export const rowsUserManagement = [
  {
    id: 1,
    name: "John Doe",
    contact: "john.doe@example.com",
    joinDate: new Date(),
    role: "Customer",
    password: "password123",
  },
  {
    id: 2,
    name: "Jane Smith",
    contact: "jane.smith@example.com",
    joinDate: new Date(),
    role: "Admin",
    password: "password456",
  },
  // Add more rows as needed
];
