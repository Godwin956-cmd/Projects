import React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "./App";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.Fragment>
      <NavBar />
      
  </React.Fragment>
);
