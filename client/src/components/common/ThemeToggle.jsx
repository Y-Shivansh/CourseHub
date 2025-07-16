import { Moon, Sun } from 'lucide-react'
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className=' cursor-pointer flex items-center'>
            {theme === "light" ? <Moon className={"hover:text-gray-500"} size={16}/> : <Sun className={"hover:text-yellow-500"} size={16}/>}
        </button>
    )
}

export default ThemeToggle
