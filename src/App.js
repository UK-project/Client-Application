import "./App.css";
import Dashboard from "./components/Dashboard";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

//todo: from separate file
const theme = createMuiTheme({
  typography: {
    allVariants: {
      color: "white",
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
      paper: "#2e3f47",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
