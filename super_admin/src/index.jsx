import React from "react";
import "./styles/color.css";
import "./styles/font.css";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "./styles/tailwind.css";

// * Context
import ContainerContextProvider from "context/ContainerContext";

ReactDOM.render(
  <React.StrictMode>
    <ContainerContextProvider>
      <App />
    </ContainerContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
