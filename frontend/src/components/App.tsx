import React from "react";
import { GlobalStyles } from "../styles/GlobalStyles";
import ThemeChanger from "./ThemeChanger";

function App() {
  return (
    <ThemeChanger>
      <GlobalStyles />
      test
    </ThemeChanger>
  );
}

export default App;
