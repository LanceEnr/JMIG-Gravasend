import { createTheme } from "@mui/material/styles";

const dashboardTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "20rem",
          backgroundColor: "#004aad", // background color of the button
          color: "#fff", // text color of the button
          "&:hover": {
            backgroundColor: "#003882", // background color of the button in hover state
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#004aad", // text color of the typography
        },
      },
    },
  },
});

export default dashboardTheme;
