import React from "react";
import { ResponsiveLine } from "@nivo/line";

const dailyData = [
  {
    id: "Truck 1",
    data: [
      { x: "2023-01-01", y: 500 },
      { x: "2023-01-02", y: 600 },
      { x: "2023-01-03", y: 700 },
      { x: "2023-01-04", y: 800 },
      { x: "2023-01-05", y: 900 },
    ],
  },
  // add more trucks here
];

const weeklyData = [
  {
    id: "Truck 1",
    data: [
      { x: "2023-W01", y: 3500 },
      { x: "2023-W02", y: 4000 },
      { x: "2023-W03", y: 4500 },
      { x: "2023-W04", y: 5000 },
      { x: "2023-W05", y: 5500 },
    ],
  },
  // add more trucks here
];

const monthlyData = [
  {
    id: "Truck 1",
    data: [
      { x: "2023-01", y: 15000 },
      { x: "2023-02", y: 16000 },
      { x: "2023-03", y: 17000 },
      { x: "2023-04", y: 18000 },
      { x: "2023-05", y: 19000 },
    ],
  },
  // add more trucks here
];

const yearlyData = [
  {
    id: "Truck 1",
    data: [
      { x: "2023", y: 200000 },
      { x: "2024", y: 210000 },
      { x: "2025", y: 220000 },
      { x: "2026", y: 230000 },
      { x: "2027", y: 240000 },
    ],
  },
  // add more trucks here
];

const MyResponsiveLine = ({ timePeriod }) => {
  let data;
  switch (timePeriod) {
    case "daily":
      data = dailyData;
      break;
    case "weekly":
      data = weeklyData;
      break;
    case "monthly":
      data = monthlyData;
      break;
    case "yearly":
      data = yearlyData;
      break;
    default:
      data = dailyData;
  }

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "time",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "maintenance cost",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default MyResponsiveLine;
