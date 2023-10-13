import axios from "axios";

// Function to fetch inventory data from the database
const fetchInventoryData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/currentInventory");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Function to transform the data into the desired format
const transformInventoryData = (data) => {
  return data.map((item) => ({
    id: item._inventoryID,
    itemName: item._itemName,
    quantity: item._quantity,
    location: item._location,
    lastUpdated: new Date(item._lastUpdated),
  }));
};

// Fetch and transform the data
const rowsCurrentInventory = transformInventoryData(await fetchInventoryData());

// Export the transformed data
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

// Function to transform the data into the desired format
const transformIncomingInventoryData = (data) => {
  return data.map((item) => ({
    id: item._inventoryID,
    itemName: item._itemName,
    quantity: item._quantity,
    sourceLocation: item._location,
    dateReceived: new Date(item._lastUpdated),
  }));
};

// Fetch and transform the data for incoming inventory
const rowsIncomingInventory = transformIncomingInventoryData(
  await fetchIncomingInventoryData()
);

// Export the transformed data
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

// Function to transform the data into the desired format
const transformOutgoingInventoryData = (data) => {
  return data.map((item) => ({
    id: item._inventoryID, // Use the appropriate property for ID
    itemName: item._itemName,
    quantity: item._quantity,
    destinationLocation: item._location,
    dateDispatched: new Date(item._lastUpdated),
  }));
};

// Fetch and transform the data for outgoing inventory
const rowsOutgoingInventory = transformOutgoingInventoryData(
  await fetchOutgoingInventoryData()
);

// Export the transformed data
export { rowsOutgoingInventory };

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
    valueOptions: ["500", "1000", "2000"],
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
export const rowsMaintenanceScheduling = [
  {
    id: 1,
    plateNo: "ABC123",
    service: "Oil Change",
    frequency: "500",
    nextDueMileage: "1500",
    nextMaintenanceDate: new Date("2024-01-01"),
  },
  {
    id: 2,
    plateNo: "XYZ789",
    service: "Tire Rotation",
    frequency: "1000",
    nextDueMileage: "2000",
    nextMaintenanceDate: new Date("2024-02-01"),
  },
  // Add more rows as needed
];

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
  },
  {
    id: 2,
    plateNo: "XYZ789",
    service: "Tire Rotation",
    serviceProvider: "Service Provider B",
    totalCost: "₱2000",
  },
  // Add more rows as needed
];

export const columnsFleetInformation = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "plateNo", headerName: "Plate No.", flex: 2, editable: true },
  { field: "chassisNo", headerName: "Chassis No.", flex: 2, editable: true },
  { field: "engineNo", headerName: "Engine No.", flex: 2, editable: true },
  { field: "gvwr", headerName: "GVWR", flex: 2, editable: true },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    flex: 2,
    editable: true,
  },
  { field: "model", headerName: "Model", flex: 2, editable: true },
  {
    field: "mileage",
    headerName: "Mileage",
    flex: 2,
    editable: true,
  },
];
export const rowsFleetInformation = [
  {
    id: 1,
    plateNo: "ABC123",
    chassisNo: "XYZ456",
    engineNo: "DEF789",
    gvwr: "5000kg",
    manufacturer: "Toyota",
    model: "Corolla",
    mileage: "10000km",
  },
  {
    id: 2,
    plateNo: "GHI321",
    chassisNo: "UVW654",
    engineNo: "JKL987",
    gvwr: "6000kg",
    manufacturer: "Honda",
    model: "Civic",
    mileage: "20000km",
  },
];

export const columnsInspectionScheduling = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "plateNo", headerName: "Plate No.", flex: 2, editable: true },
  {
    field: "inspectionType",
    headerName: "Inspection Type",
    flex: 2,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Pre-Trip", "Post-Trip"],
  },
  {
    field: "nextInspectionDate",
    headerName: "Next Inspection Date",
    type: "date",
    flex: 3,
    editable: true,
  },
];

export const rowsInspectionScheduling = [
  {
    id: 1,
    plateNo: "ABC123",
    inspectionType: "Pre-Trip",
    nextInspectionDate: new Date("2024-01-01"),
  },
  {
    id: 2,
    plateNo: "XYZ789",
    inspectionType: "Post-Trip",
    nextInspectionDate: new Date("2024-02-01"),
  },
  // Add more rows as needed
];

export const columnsInspectionRecords = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "plateNo", headerName: "Plate No.", flex: 2 },
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

export const rowsInspectionRecords = [
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
  },
  {
    field: "lastUpdated",
    headerName: "Last Updated",
    type: "datetime",
    flex: 3,
    editable: true,
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

export const rowsManageOrders = [
  {
    id: 1,
    customerName: "John Doe",
    contact: "123-456-7890",
    orderDate: new Date(2023, 0, 1),
    status: "Available for pickup",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    contact: "098-765-4321",
    orderDate: new Date(2023, 1, 14),
    status: "Cancelled",
  },
  // Add more rows as needed
];

export const columnsDriverManagement = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1, editable: true },
  { field: "contact", headerName: "Contact", flex: 1, editable: true },
  {
    field: "hireDate",
    headerName: "Hire Date",
    type: "date",
    flex: 1,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Active", "Inactive"],
  },
  { field: "password", headerName: "Password", flex: 1 },
];

export const rowsDriverManagement = [
  {
    id: 1,
    name: "John Doe",
    contact: "123-456-7890",
    hireDate: new Date(),
    status: "Active",
    password: "password123",
  },
  {
    id: 2,
    name: "Jane Smith",
    contact: "098-765-4321",
    hireDate: new Date(),
    status: "Inactive",
    password: "password456",
  },
  // Add more objects as needed...
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
