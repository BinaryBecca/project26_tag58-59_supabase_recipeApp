import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import MainProvider from "./context/MainProvider.tsx"
import DarkModeProvider from "./components/darkModeContext/DarkModeProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <MainProvider>
        <App />
      </MainProvider>
    </DarkModeProvider>
  </StrictMode>
)
