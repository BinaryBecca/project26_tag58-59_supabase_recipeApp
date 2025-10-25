import { useContext } from "react"
import UserRecipeList from "../../components/userRecipeList/UserRecipeList"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"

export default function UserRecipes() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  return (
    <>
      <h2
        className={`text-center font-quicksand font-bold text-4xl pt-5 pb-6 ${
          isDarkMode ? "text-gray-700" : "text-white/80"
        }`}>
        Erstellte Rezepte
      </h2>
      <UserRecipeList />
    </>
  )
}
