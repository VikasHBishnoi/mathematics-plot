import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./variables.scss";
import App from "./App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
