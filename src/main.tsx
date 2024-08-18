import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CalandarProvider } from "./context/calandar.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CalandarProvider>
      <App />
    </CalandarProvider>
  </StrictMode>
);
