import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F9F2F1", // Default background color for the entire application
      paper: "#F3E4E2", // Background color for paper components like cards, dialogs, etc.
    },
    primary: {
      main: "#F0FBFF",
    },
    secondary: {
      main: "#19074F",
    },
  },
});

export default theme;
