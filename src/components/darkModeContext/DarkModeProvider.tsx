/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react"

export interface DarkmodeProviderProps {
  isDarkMode: boolean
  activatingDarkMode: () => void
}

export const darkModeContext = createContext<DarkmodeProviderProps | undefined>(undefined)

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const activatingDarkMode = () => {
    if (isDarkMode) {
      setIsDarkMode(false)
    } else {
      setIsDarkMode(true)
    }
  }

  return <darkModeContext.Provider value={{ isDarkMode, activatingDarkMode }}>{children}</darkModeContext.Provider>
}
