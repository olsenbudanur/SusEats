import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { useState } from "react";
import Auctions from "./Pages/Auctions";

function App() {
  const [page, setPage] = useState("Home");

  if (page === "Home") {
    return     <ThemeProvider theme={theme}>
    <Home changePage={setPage}/>
  </ThemeProvider>
  }

  if (page === "Sales") {
    return <ThemeProvider theme={theme}>
      <Auctions changePage={setPage}/>
  </ThemeProvider>
  }

  return (
    <div>Page not found</div>
  );
}

export default App;
