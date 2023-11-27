import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { RequestProvider } from "react-request-hook";
import { StateProvider } from "./contexts";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:3000/api",
});

// Wrap the StateProvider around the RequestProvider and App components
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RequestProvider value={axiosInstance}>
      <StateProvider>
        <App />
      </StateProvider>
    </RequestProvider>
  </React.StrictMode>
);
