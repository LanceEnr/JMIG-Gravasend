import { createTheme } from "@mui/material/styles";

export const dashboardTheme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "20rem",
          backgroundColor: "#004aad", // background color of the button
          color: "#fff", // text color of the button
          "&:hover": {
            backgroundColor: "#003882", // background color of the button in hover state
          },
        },
      },
    },
  },
});

export default dashboardTheme;
