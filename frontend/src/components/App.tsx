import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BoardContextProvider } from "../context/BoardContextProvider";
import { GlobalStyles } from "../styles/GlobalStyles";
import Dashboard from "./Dashboard";
import ThemeChanger from "./ThemeChanger";

function App() {
  return (
    <ThemeChanger>
      <GlobalStyles />
      <DndProvider backend={HTML5Backend}>
        <BoardContextProvider>
          <Dashboard />
        </BoardContextProvider>
      </DndProvider>
    </ThemeChanger>
  );
}

export default App;
