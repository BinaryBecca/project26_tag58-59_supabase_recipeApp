import { useContext } from "react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { ICategory } from "../../interfaces/ICategory"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"

interface CategoriesBarProps {
  selectingACategory: string | null
  setSelectingACategory: (id: string | null) => void
}

export default function CategoriesBar({ selectingACategory, setSelectingACategory }: CategoriesBarProps) {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const { categories } = useContext(mainContext) as mainContextProps

  return (
    <div
      className="flex flex-row gap-5 font-quicksand text-2xl py-10 overflow-x-auto
        px-2 md:pl-6
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap">
      <button
        onClick={() => setSelectingACategory(null)}
        className={`inline-block p-5 rounded-4xl cursor-pointer ${
          selectingACategory === null
            ? "bg-pastelpink font-bold border border-white/80"
            : isDarkMode
            ? "bg-pastelpink/40"
            : "bg-white/20"
        }`}>
        Alle
      </button>

      {categories.map((category: ICategory) => {
        return (
          <button
            key={category.id}
            onClick={() => setSelectingACategory(category.id)}
            className={`inline-block p-5 rounded-4xl cursor-pointer ${
              selectingACategory === category.id
                ? "bg-pastelpink font-bold border border-white/80"
                : isDarkMode
                ? "bg-pastelpink/40"
                : "bg-white/20"
            }`}>
            {category.name}
          </button>
        )
      })}
    </div>
  )
}
