import { useEffect, useState } from "react";
import { ThemeContext } from "../context/themeContext";

// Create ThemeProvider Component
/*
ThemeProvider – The provider of the box (ThemeContext)
You wrap your app with it once, usually in main.jsx.
This gives your entire React tree access to theme and toggle function via context.
*/
export const ThemeProvider = ({ children }) => { // children is a special prop that represents whatever you wrap inside the component.
    // Initial state set: dark or light — check localStorage
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("coursehub_theme") || "light";
    });

    // Toggle theme function — change state + update localStorage
    const toggleTheme = () => {
        setTheme((prev) => {
            const nextTheme = prev === "dark" ? "light" : "dark";
            localStorage.setItem("coursehub_theme", nextTheme);
            return nextTheme;
        });
    }

    // Whenever theme changes → apply/remove `dark` class on <html>
    useEffect(() => {
        const html = document.documentElement; // Gets the <html> tag of your entire page — React gives you access via document.documentElement
        if (theme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark")
        }
    }, [theme]);

    // Provide theme + toggleTheme to rest of the app
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

