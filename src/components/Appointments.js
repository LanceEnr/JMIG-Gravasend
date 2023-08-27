import React from "react";
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
  return (
    <React.Fragment>
      <Typography>Your Appointments</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell align="right">Message</TableCell>
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
        color="primary"
        href="#"
        onClick={(e) => e.preventDefault()}
        sx={{ mt: 3 }}
      >
        See more appointments
      </Link>
    </React.Fragment>
  );
}
