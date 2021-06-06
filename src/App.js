import "./App.css";
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from './style/themeConfig'

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
