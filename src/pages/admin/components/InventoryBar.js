import React from "react";

import { ResponsiveBar } from "@nivo/bar";

const data = [
  {
    product: "Sand",
    Sand: 50, // quantity of Sand
  },
  {
    product: "Gravel",
    Gravel: 30, // quantity of Gravel
  },
  {
    product: "Escombro",
    Escombro: 20, // quantity of Escombro
  },
  // add more products here
];

const InventoryBar = () => (
  <ResponsiveBar
    data={data}
    keys={[
      "Sand",
      "Gravel",
      "Escombro",
      // add more product names here
    ]}
    indexBy="product"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "nivo" }}
    // add more defs and fill if needed
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "product",
      legendPosition: "middle",
      legendOffset: 32,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "quantity (cu. mt.)",
      legendPosition: "middle",
      legendOffset: -40,
      truncateTickAt: 0,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) =>
      e.id + ": " + e.formattedValue + " in product: " + e.indexValue
    }
  />
);

export default InventoryBar;
