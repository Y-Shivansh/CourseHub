import { Moon, Sun } from 'lucide-react'
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>
            {theme === "light" ? <Moon /> : <Sun />}
        </button>
    )
}

export default ThemeToggle
