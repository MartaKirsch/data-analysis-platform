import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BoardContextProvider } from "../context/BoardContextProvider";
import { GlobalStyles } from "../styles/GlobalStyles";
import Dashboard from "./Dashboard";
import ThemeChanger from "./ThemeChanger";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

  const handlePageUnload = useCallback(() => {
    navigator.sendBeacon(`${process.env.REACT_APP_BACKEND_URL}/wipe_board`);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handlePageUnload);
    return () => window.removeEventListener("beforeunload", handlePageUnload);
  }, [handlePageUnload]);

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
