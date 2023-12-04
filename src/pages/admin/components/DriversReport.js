import React, { useState, useEffect } from "react";
import Typography from "../../../components/common/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Paper, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import MyResponsivePie from "./MyResponsivePie";

function DriversReport() {
  const navigate = useNavigate();
  const [performanceData, setPerformanceData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const transformDriverData = (data) => {
    const transformedData = [];
    if (data) {
      for (const uid in data) {
        if (data.hasOwnProperty(uid)) {
          const userData = data[uid];

          const mappedData = {
            performance: userData.performance,
          };

          transformedData.push(mappedData);
        }
      }
    }

    return transformedData;
  };

  const countPerformanceRanges = (data) => {
    const count = {
      excellent: 0,
      good: 0,
      average: 0,
      needsImprovement: 0,
    };

    data.forEach((item) => {
      const performanceValue = parseFloat(item.performance);

      if (!isNaN(performanceValue)) {
        if (performanceValue >= 1.0 && performanceValue <= 1.25) {
          count.excellent++;
        } else if (performanceValue > 1.25 && performanceValue <= 1.5) {
          count.good++;
        } else if (performanceValue > 1.5 && performanceValue <= 1.75) {
          count.average++;
        } else if (performanceValue > 1.75 && performanceValue <= 2.0) {
          count.needsImprovement++;
        }
      }
    });

    return count;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDriverInformation();
        const transformedData = transformDriverData(data);
        setPerformanceData(transformedData);

        // Count instances within each range
        const performanceCount = countPerformanceRanges(transformedData);
        console.log("Performance Count:", performanceCount);

        // Create chart data
        const dynamicChartData = [
          {
            id: "Excellent",
            label: "Excellent (1.0 - 1.25)",
            value: performanceCount.excellent,
            color: "hsl(70, 70%, 50%)",
          },
          {
            id: "Good",
            label: "Good (1.26 - 1.5)",
            value: performanceCount.good,
            color: "hsl(329, 70%, 50%)",
          },
          {
            id: "Average",
            label: "Average (1.51 - 1.75)",
            value: performanceCount.average,
            color: "hsl(189, 70%, 50%)",
          },
          {
            id: "Needs Improvement",
            label: "Needs Improvement (1.76 - 2.0)",
            value: performanceCount.needsImprovement,
            color: "hsl(214, 70%, 50%)",
          },
        ];

        setChartData(dynamicChartData);
      } catch (error) {
        console.error("Error fetching and transforming data:", error);
      }
    };

    fetchData();
  }, []);

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
                <Button
                  variant="contained"
                  sx={{ ml: 1 }}
                  startIcon={<PrintIcon />}
                >
                  Print
                </Button>
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
              <MyResponsivePie data={chartData} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default DriversReport;
