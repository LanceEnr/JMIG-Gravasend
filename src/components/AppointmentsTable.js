import React from "react";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { Box, TableContainer } from "@mui/material";

import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Tooltip,
} from "@mui/material";

const getStatusColor = (status) => {
  switch (status) {
    case "upcoming":
      return "#ff9100";
    case "cancelled":
      return "#ff1744";
    case "completed":
      return "#00e676";
    default:
      return "inherit";
  }
};

const appointments = [
  {
    id: 1,
    date: "16 Mar, 2019",
    message:
      "Interested in bulk purchase of gravel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum diam a neque rutrum, in fermentum diam luctus. Sed risus tortor, dignissim id tortor sit amet, scelerisque scelerisque sapien. Nulla convallis eleifend lorem eget vulputate. Cras in nibh volutpat, sagittis neque sed, dictum nisi. ",
    status: "upcoming",
  },
  {
    id: 1,
    date: "16 Mar, 2019",
    message:
      "Interested in bulk purchase of gravel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum diam a neque rutrum, in fermentum diam luctus. Sed risus tortor, dignissim id tortor sit amet, scelerisque scelerisque sapien. Nulla convallis eleifend lorem eget vulputate. Cras in nibh volutpat, sagittis neque sed, dictum nisi. ",
    status: "cancelled",
  },
  {
    id: 1,
    date: "16 Mar, 2019",
    message:
      "Interested in bulk purchase of gravel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum diam a neque rutrum, in fermentum diam luctus. Sed risus tortor, dignissim id tortor sit amet, scelerisque scelerisque sapien. Nulla convallis eleifend lorem eget vulputate. Cras in nibh volutpat, sagittis neque sed, dictum nisi. ",
    status: "completed",
  },
  {
    id: 1,
    date: "16 Mar, 2019",
    message:
      "Interested in bulk purchase of gravel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum diam a neque rutrum, in fermentum diam luctus. Sed risus tortor, dignissim id tortor sit amet, scelerisque scelerisque sapien. Nulla convallis eleifend lorem eget vulputate. Cras in nibh volutpat, sagittis neque sed, dictum nisi. ",
    status: "completed",
  },
  {
    id: 1,
    date: "16 Mar, 2019",
    message:
      "Interested in bulk purchase of gravel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum diam a neque rutrum, in fermentum diam luctus. Sed risus tortor, dignissim id tortor sit amet, scelerisque scelerisque sapien. Nulla convallis eleifend lorem eget vulputate. Cras in nibh volutpat, sagittis neque sed, dictum nisi. ",
    status: "completed",
  },
];

export default function AppointmentsTable() {
  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ color: "#004aad", fontWeight: "bold" }}>
        Your Appointments
      </Typography>
      <TableContainer sx={{ maxWidth: "100%" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Inquiry</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.date}</TableCell>
                <Tooltip title={appointment.message}>
                  <TableCell>
                    {appointment.message.split(" ").slice(0, 15).join(" ") +
                      "..."}
                  </TableCell>
                </Tooltip>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        color: "white",
                        border: "1px solid",
                        borderColor: getStatusColor(appointment.status),
                        bgcolor: getStatusColor(appointment.status),
                        borderRadius: 1,
                        px: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      {appointment.status}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    disabled={appointment.status !== "upcoming"}
                  >
                    <CancelIcon sx={{ fontSize: "8x" }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    disabled={appointment.status !== "upcoming"}
                  >
                    <EditIcon sx={{ fontSize: "18px" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link
        color="#004aad"
        href="#"
        onClick={(e) => e.preventDefault()}
        sx={{ mt: 3 }}
      >
        See more appointments
      </Link>
    </React.Fragment>
  );
}
