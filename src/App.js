// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import ClientHomePage from "./components/ClientHomePage";
import SensorProviderHomePage from "./components/SensorProviderHomePage";
import "./App.css";
import SensorDataPage from "./SensorDataPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/client" element={<ClientHomePage />} />
          <Route path="/provider" element={<SensorProviderHomePage />} />
          <Route path="/sensor-data" element={<SensorDataPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
