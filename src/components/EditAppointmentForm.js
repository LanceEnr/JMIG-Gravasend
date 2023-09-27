import React from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  useMediaQuery,
  List,
  Button,
  TextField,
} from "@mui/material";
import UserDrawer from "./common/UserDrawer";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

export default function EditAppointmentForm(props) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const userData = {
    "First Name": "",
    "Last Name": "",
    Email: "",
    Phone: "",
    Reason: "",
    Schedule: "",
  };

  console.log(props.goBack); // Add this line

  return (
    <List
      sx={{
        px: 0,
        py: 0,
        marginBottom: 1,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: "#004aad",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            my: 2,
          }}
        >
          <EditCalendarIcon sx={{ mr: 2, verticalAlign: "middle" }} />
          Edit Appointment
        </Typography>
        {isMobile && (
          <UserDrawer onActiveComponentChange={props.onActiveComponentChange} />
        )}
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={2} style={{ padding: "24px" }}>
            <Grid container spacing={3} alignItems="center">
              {Object.entries(userData).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  {key === "Schedule" ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label={key}
                        slotProps={{ textField: { fullWidth: true } }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </LocalizationProvider>
                  ) : (
                    <TextField label={key} defaultValue={value} fullWidth />
                  )}
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={props.goBack}
                  sx={{
                    mt: 2,
                    marginRight: 2,
                    color: "#004aad",
                    borderColor: "#004aad",
                  }}
                >
                  Go Back
                </Button>

                <Button
                  variant="primary"
                  type="submit"
                  sx={{
                    mt: 2,
                    backgroundColor: "#004aad",
                    color: "#fff", // adjust text color as needed
                    "&:hover": {
                      backgroundColor: "#003882", // darker shade for hover state
                    },
                  }}
                >
                  Save changes
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </List>
  );
}
