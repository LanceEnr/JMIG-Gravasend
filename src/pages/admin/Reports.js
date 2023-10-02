import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, Grid, Paper, Container } from "@mui/material";

// Sample data
const deliveriesData = [
  { name: "Delivered", value: 400 },
  { name: "Pending", value: 300 },
];
const driverPerformanceData = [
  { name: "Driver 1", Performance: 400 },
  { name: "Driver 2", Performance: 300 },
];
const truckMaintenanceData = [
  { name: "Truck 1", Maintenance: 400 },
  { name: "Truck 2", Maintenance: 300 },
];
// Sample data
const truckSchedulingData = [
  { name: "Scheduled", value: 400 },
  { name: "Not Scheduled", value: 300 },
];
const inventoryData = [
  { name: "Item 1", Inventory: 400 },
  { name: "Item 2", Inventory: 300 },
];
const ordersData = [
  { name: "Order 1", Orders: 400 },
  { name: "Order 2", Orders: 300 },
];
const customerData = [
  { name: "Customer 1", value: 400 },
  { name: "Customer 2", value: 300 },
];
const appointmentData = [
  { name: "Appointment 1", Appointments: 400 },
  { name: "Appointment 2", Appointments: 300 },
];
const jobOrdersData = [
  { name: "Job Order 1", JobOrders: 400 },
  { name: "Job Order 2", JobOrders: 300 },
];
const data = [
  { name: "Report 1", value: 400 },
  { name: "Report 2", value: 300 },
  // Add more reports as needed
];

// Component for Deliveries report
const DeliveriesReport = () => (
  <Card>
    <PieChart width="100%" height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={deliveriesData}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  </Card>
);

// Component for Driver Performance report
const DriverPerformanceReport = () => (
  <Card>
    <BarChart width="100%" height={300} data={driverPerformanceData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Performance" fill="#8884d8" />
    </BarChart>
  </Card>
);

// Component for Truck Maintenance report
const TruckMaintenanceReport = () => (
  <Card>
    <BarChart width="100%" height={300} data={truckMaintenanceData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Maintenance" fill="#8884d8" />
    </BarChart>
  </Card>
);

// Component for Truck Scheduling report
const TruckSchedulingReport = () => (
  <Card>
    <PieChart width="100%" height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={truckSchedulingData}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  </Card>
);

// Component for Inventory report
const InventoryReport = () => (
  <Card>
    <BarChart width="100%" height={300} data={inventoryData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Inventory" fill="#8884d8" />
    </BarChart>
  </Card>
);

// Component for Orders report
const OrdersReport = () => (
  <Card>
    <BarChart width="100%" height={300} data={ordersData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Orders" fill="#8884d8" />
    </BarChart>
  </Card>
);

// Component for Customer report
const CustomerReport = () => (
  <Card>
    <PieChart width="100%" height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={customerData}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  </Card>
);

// Component for Appointment report
const AppointmentReport = () => (
  <Card>
    <BarChart width="100%" height={300} data={appointmentData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Appointments" fill="#8884d8" />
    </BarChart>
  </Card>
);

// Component for Job Orders report
const JobOrdersReport = () => (
  <Card>
    <BarChart width="100%" height={300} data={jobOrdersData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="JobOrders" fill="#8884d8" />
    </BarChart>
  </Card>
);

// Main component for the dashboard
const Reports = () => (
  <Container>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper>
          <DeliveriesReport />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper>
          <DriverPerformanceReport />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper>
          <TruckMaintenanceReport />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper>
          <TruckSchedulingReport />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper>
          <InventoryReport />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper>
          <OrdersReport />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper>
          <CustomerReport />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper>
          <JobOrdersReport />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper>
          <AppointmentReport />
        </Paper>
      </Grid>
    </Grid>
  </Container>
);
export default Reports;
