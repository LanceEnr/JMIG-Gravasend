import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, Box, TableContainer } from "@mui/material";

// Generate Order Data
function createData(id, date, paymentMethod, product, qty, amount, status) {
  return { id, date, paymentMethod, product, qty, amount, status };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "VISA ⠀•••• 3719",
    "Gravel",
    "100",
    50000,
    "pending"
  ),
  createData(
    1,
    "16 Mar, 2019",
    "VISA ⠀•••• 2574",
    "Sand",
    "100",
    25000,
    "failed"
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Cash on Pickup",
    "Gravel",
    "100",
    30000,
    "arrived"
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Cash on Pickup",
    "Sand",
    "100",
    100000,
    "arrived"
  ),
  createData(
    4,
    "15 Mar, 2019",
    "VISA ⠀•••• 5919",
    "Gravel",
    "100",
    35000,
    "arrived"
  ),
];

const getStatusColor = (status) => {
  switch (status) {
    case "failed":
      return "#ff1744";
    case "pending":
      return "#ff9100";
    case "arrived":
      return "#00e676";
    default:
      return "inherit";
  }
};

function preventDefault(event) {
  event.preventDefault();
}

export default function OrdersTable() {
  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ color: "#004aad", fontWeight: "bold" }}>
        Your Order Requests
      </Typography>{" "}
      <TableContainer sx={{ maxWidth: "100%" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Payment Method</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Order Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.qty} cubic mt.</TableCell>
                <TableCell>{`PHP${row.amount}`}</TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box
                      sx={{
                        color: "white",
                        border: "1px solid",
                        borderColor: getStatusColor(row.status),
                        bgcolor: getStatusColor(row.status),
                        borderRadius: 1,
                        px: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      {row.status}
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link color="#004aad" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
