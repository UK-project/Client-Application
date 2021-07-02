import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
    typography: {
      allVariants: {
        color: "#000",
      },
    },
    palette: {
      primary: {
        main: "##5E72E4",
      },
      secondary: {
        main: "#5E72E4",
      },
      background: {
        
        default: "#F1F4F9",
        //paper change app-bar and side drawer
        paper: "white",
      },
      text: {
        primary: "#5E72E4",
      },
      
    },
  });

  export default theme;
  