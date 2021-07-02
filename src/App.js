import "./App.css";
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./style/themeConfig";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import Loading from "./components/ui/Loading/Loading";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 100);
  }, []);
  return (
    // <ThemeProvider >
    IsLoading ? (
      <Loading />
    ) : (
      <Router>
        <div className="App">
          <Sidebar />
          <Dashboard />
        </div>
      </Router>
    )
    // </ThemeProvider>
  );
}
export default App;
