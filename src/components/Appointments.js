import React from "react";
import { useTheme } from "@mui/material/styles";

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

const appointments = [
  {
    id: 1,
    date: "16 Mar, 2019",
    name: "John Doe",
    email: "lance@gmail.com",
    contactNumber: "09774584232",
    message:
      "Interested in bulk purchase of gravel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum diam a neque rutrum, in fermentum diam luctus. Sed risus tortor, dignissim id tortor sit amet, scelerisque scelerisque sapien. Nulla convallis eleifend lorem eget vulputate. Cras in nibh volutpat, sagittis neque sed, dictum nisi. ",
  },
  {
    id: 1,
    date: "16 Mar, 2019",
    name: "John Doe",
    email: "lance@gmail.com",
    contactNumber: "09774584232",
    message:
      "Interested in bulk purchase of gravel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum diam a neque rutrum, in fermentum diam luctus. Sed risus tortor, dignissim id tortor sit amet, scelerisque scelerisque sapien. Nulla convallis eleifend lorem eget vulputate. Cras in nibh volutpat, sagittis neque sed, dictum nisi. ",
  },
  {
    id: 1,
    date: "16 Mar, 2019",
    name: "John Doe",
    email: "lance@gmail.com",
    contactNumber: "09774584232",
    message:
      "Interested in bulk purchase of gravel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum diam a neque rutrum, in fermentum diam luctus. Sed risus tortor, dignissim id tortor sit amet, scelerisque scelerisque sapien. Nulla convallis eleifend lorem eget vulputate. Cras in nibh volutpat, sagittis neque sed, dictum nisi. ",
  },
  {
    id: 1,
    date: "16 Mar, 2019",
    name: "John Doe",
    email: "lance@gmail.com",
    contactNumber: "09774584232",
    message:
      "Interested in bulk purchase of gravel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum diam a neque rutrum, in fermentum diam luctus. Sed risus tortor, dignissim id tortor sit amet, scelerisque scelerisque sapien. Nulla convallis eleifend lorem eget vulputate. Cras in nibh volutpat, sagittis neque sed, dictum nisi. ",
  },
  {
    id: 1,
    date: "16 Mar, 2019",
    name: "John Doe",
    email: "lance@gmail.com",
    contactNumber: "09774584232",
    message:
      "Interested in bulk purchase of gravel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum diam a neque rutrum, in fermentum diam luctus. Sed risus tortor, dignissim id tortor sit amet, scelerisque scelerisque sapien. Nulla convallis eleifend lorem eget vulputate. Cras in nibh volutpat, sagittis neque sed, dictum nisi. ",
  },
];

export default function Appointments() {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ color: "#004aad", fontWeight: "bold" }}>
        Your Appointments
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Contact</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Message
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.name}</TableCell>
              <TableCell>{appointment.email}</TableCell>
              <TableCell>{appointment.contactNumber}</TableCell>
              <Tooltip title={appointment.message}>
                <TableCell align="right">
                  {appointment.message.split(" ").slice(0, 5).join(" ") + "..."}
                </TableCell>
              </Tooltip>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
