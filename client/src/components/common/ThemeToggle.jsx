import { Moon, Sun } from 'lucide-react'
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = ({ size, withText, text}) => {
    const { theme, toggleTheme } = useTheme();
    const style = withText ? "cursor-pointer flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md w-full justfy-between" : ""

    return (
            <button onClick={toggleTheme} className={`${style} dark:text-text-dark text-text-light hover:text-gray-500 dark:hover:text-yellow-500`}>
                {withText && <div className='text-md'>{text}</div>}
                {theme === "light" ? <Moon size={size} /> : <Sun size={size} />}
            </button>
    )
}

export default ThemeToggle
