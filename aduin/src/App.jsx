import React from "react";
import Routes from "./Routes";
import ContainerContextProvider from "context/ContainerContext";

function App() {
  return (
    <ContainerContextProvider>
      <Routes />
    </ContainerContextProvider>
  );
}

export default App;
