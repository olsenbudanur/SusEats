import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { useState } from "react";
import Auctions from "./Pages/Auctions";
import Profile from "./Pages/Profile";

function App() {
  const [page, setPage] = useState("Home");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState("person");


  console.log(user, userType)
  if (page === "Home") {
    return     <ThemeProvider theme={theme}>
    <Home changePage={setPage}/>
  </ThemeProvider>
  }

  if (page === "Sales") {
    return <ThemeProvider theme={theme}>
      <Auctions changePage={setPage} userType={userType} user={user}/>
  </ThemeProvider>
  }

  if (page === "Profile") {
    return <ThemeProvider theme={theme}>
      <Profile changePage={setPage} setUserType={setUserType} userType={userType} isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} setUser={setUser}/>
      </ThemeProvider>
  }

  return (
    <div>Page not found</div>
  );
}

export default App;
