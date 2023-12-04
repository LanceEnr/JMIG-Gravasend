import React from "react";

import Typography from "../../../components/common/Typography";
import { Link } from "react-router-dom";
import { Paper, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";

import { Box, Grid } from "@mui/material";
import MyResponsivePie from "./MyResponsivePie";
const data = [
  {
    id: "Excellent",
    label: "Excellent (1.0 - 1.25)",
    value: 412,
    color: "hsl(70, 70%, 50%)",
  },
  {
    id: "Good",
    label: "Good (1.26 - 1.5)",
    value: 435,
    color: "hsl(329, 70%, 50%)",
  },
  {
    id: "Average",
    label: "Average (1.51 - 1.75)",
    value: 495,
    color: "hsl(189, 70%, 50%)",
  },
  {
    id: "Needs Improvement",
    label: "Needs Improvement (1.76 - 2.0)",
    value: 239,
    color: "hsl(214, 70%, 50%)",
  },
];

class ComponentToPrint extends React.Component {
  render() {
    return (
      <Paper
        sx={{
          mt: 3,
          p: 2,
          display: "flex",
          flexDirection: "column",

          height: "74vh",
        }}
      >
        <MyResponsivePie data={data} />
      </Paper>
    );
  }
}

class DriversReport extends React.Component {
  componentRef = React.createRef();

  render() {
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
                  Driver Performance Report
                </Typography>
                <Box display="flex">
                  <Button
                    variant="outlined"
                    sx={{ ml: 1 }}
                    color="primary"
                    component={Link}
                    to={"/admindrivermanagement"}
                  >
                    Go Back
                  </Button>
                  <ReactToPrint
                    trigger={() => (
                      <Button variant="contained" startIcon={<PrintIcon />}>
                        Print
                      </Button>
                    )}
                    content={() => this.componentRef.current}
                  />
                </Box>
              </Box>

              <ComponentToPrint ref={this.componentRef} />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default DriversReport;
