import React from "react";
import { GlobalStyles } from "../styles/GlobalStyles";
import Dashboard from "./Dashboard";
import ThemeChanger from "./ThemeChanger";

function App() {
  return (
    <ThemeChanger>
      <GlobalStyles />
      <Dashboard />
    </ThemeChanger>
  );
}

export default App;
