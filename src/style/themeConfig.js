import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
    typography: {
      allVariants: {
        color: "black",
      },
    },
    palette: {
      primary: {
        main: "#2e3f47",
      },
      secondary: {
        main: "#f94a4a",
      },
      background: {
        default: "#233036",
        paper: "white",
      },
      text: {
        primary: "#000",
      },
    },
  });

  export default theme;