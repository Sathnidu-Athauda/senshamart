import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./components/SensorDataPage.css";

function SensorDataPage() {
  const [activeTab, setActiveTab] = useState("graph");
  const [selectedSensor, setSelectedSensor] = useState("Sensor A");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const sensorData = {
    "Sensor A": {
      id: "1216548",
      type: "Room Temperature Sensor",
      location: "Australia",
      amount: "12,482",
      duration: "600 min",
      dutyCycle: "21",
      purchaseDate: "Apr-08-2024",
      invoice: "423463455",
      graphData: [18, 22, 19, 21],
    },
    "Sensor B": {
      id: "9845621",
      type: "Outdoor Weather Sensor",
      location: "USA",
      amount: "9,300",
      duration: "1200 min",
      dutyCycle: "35",
      purchaseDate: "Mar-15-2024",
      invoice: "678912345",
      graphData: [15, 20, 17, 23],
    },
  };

  useEffect(() => {
    if (activeTab === "graph") {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["8AM", "12PM", "4PM", "8PM"],
          datasets: [
            {
              label: "Temperature (°C)",
              data: sensorData[selectedSensor].graphData,
              borderColor: "red",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, max: 30 }, // ✅ Limit graph scaling
          },
        },
      });
    }
  }, [activeTab, selectedSensor]);

  return (
    <div className="sensor-data-page">
      <header className="header">
        <h1 className="logo">
          <span className="logo-part blue">Sen</span>
          <span className="logo-part orange">Sha</span>
          <span className="logo-part blue">Mart</span>
        </h1>
      </header>

      <main>
        <div className="sensor-selection">
          <label htmlFor="sensor-dropdown">Select Sensor:</label>
          <select
            id="sensor-dropdown"
            value={selectedSensor}
            onChange={(e) => setSelectedSensor(e.target.value)}
          >
            {Object.keys(sensorData).map((sensor) => (
              <option key={sensor} value={sensor}>
                {sensor}
              </option>
            ))}
          </select>
        </div>

        <div className="sensor-info">
          <div className="sensor-info-grid">
            <p>
              <strong>ID:</strong> {sensorData[selectedSensor].id}
            </p>
            <p>
              <strong>Type:</strong> {sensorData[selectedSensor].type}
            </p>
            <p>
              <strong>Location:</strong> {sensorData[selectedSensor].location}
            </p>
            <p>
              <strong>Amount:</strong> {sensorData[selectedSensor].amount}
            </p>
            <p>
              <strong>Duration:</strong> {sensorData[selectedSensor].duration}
            </p>
            <p>
              <strong>Duty Cycle:</strong>{" "}
              {sensorData[selectedSensor].dutyCycle}
            </p>
            <p>
              <strong>Purchase Date:</strong>{" "}
              {sensorData[selectedSensor].purchaseDate}
            </p>
            <p>
              <strong>Invoice:</strong> {sensorData[selectedSensor].invoice}
            </p>
          </div>
        </div>

        <hr className="divider" />

        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${activeTab === "graph" ? "active" : ""}`}
            onClick={() => setActiveTab("graph")}
          >
            Graph
          </button>
          <button
            className={`toggle-btn ${activeTab === "raw-data" ? "active" : ""}`}
            onClick={() => setActiveTab("raw-data")}
          >
            Raw Data
          </button>
          <button
            className={`toggle-btn ${
              activeTab === "data-access" ? "active" : ""
            }`}
            onClick={() => setActiveTab("data-access")}
          >
            Data Access Information
          </button>
        </div>

        <div className="toggle-content">
          {activeTab === "graph" && (
            <div id="graph-section">
              <h2>Temperature Data</h2>
              <p>21°C (Last 12 Hours)</p>
              <canvas ref={chartRef} className="sensor-chart"></canvas>
            </div>
          )}
          {activeTab === "raw-data" && (
            <div id="raw-data-section">
              <h2>Raw Data</h2>
              <pre>
                {JSON.stringify(
                  {
                    Timestamp: "1231241412",
                    SensorID: sensorData[selectedSensor].id,
                    Measuring: "Temperature",
                    Value: "21.34",
                    Unit: "Celsius",
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
          {activeTab === "data-access" && (
            <div id="data-access-section">
              <h2>Data Access Information</h2>
              <p>Protocol: MQTT</p>
              <p>Broker IP: mqtt://136.186.108.94:5003</p>
              <p>Topic: out/BmQb6nveqKDBRW3Lb76NuwFF3DMs9dmOCzxa1pwUw=/0</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SensorDataPage;
