import React, { useState, useRef } from "react";
import Typography from "../../../components/common/Typography";
import { Link } from "react-router-dom";
import { Paper, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box, Grid } from "@mui/material";
import MyResponsivePie from "./MyResponsivePie";
import MyResponsiveLine from "./MyResponsiveLine";

const ComponentToPrint = ({ timePeriod }) => (
  <MyResponsiveLine timePeriod={timePeriod} />
);

const MaintenanceCostReport = () => {
  const [timePeriod, setTimePeriod] = useState("daily");
  const componentRef = useRef();

  return (
    <div>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography
                variant="h3"
                marked="left"
                style={{ fontWeight: "bold", fontSize: "30px" }}
                gutterBottom
              >
                Maintenance Cost Report
              </Typography>
              <Box display="flex">
                <Button
                  variant="outlined"
                  sx={{ ml: 1 }}
                  color="primary"
                  component={Link}
                  to={"/adminmaintenance"}
                >
                  Go Back
                </Button>
                <ReactToPrint
                  trigger={() => (
                    <Button variant="contained" startIcon={<PrintIcon />}>
                      Print
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              </Box>
            </Box>
            <Paper
              sx={{
                mt: 3,
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "74vh",
              }}
            >
              <ButtonGroup
                size="small"
                aria-label="outlined primary button group"
              >
                <Button onClick={() => setTimePeriod("daily")}>Daily</Button>
                <Button onClick={() => setTimePeriod("weekly")}>Weekly</Button>
                <Button onClick={() => setTimePeriod("monthly")}>
                  Monthly
                </Button>
                <Button onClick={() => setTimePeriod("yearly")}>Yearly</Button>
              </ButtonGroup>
              <ComponentToPrint ref={componentRef} timePeriod={timePeriod} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default MaintenanceCostReport;
