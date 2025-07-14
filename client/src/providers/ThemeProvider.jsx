import { useEffect, useState } from "react";
import { ThemeContext } from "../context/themeContext";

// Create ThemeProvider Component
/*
ThemeProvider – The provider of the box (ThemeContext)
You wrap your app with it once, usually in main.jsx.
This gives your entire React tree access to theme and toggle function via context.
*/
export const ThemeProvider = ({children}) => { // children is a special prop that represents whatever you wrap inside the component.
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    // change theme
    useEffect(() => {
        const html = document.documentElement; // Gets the <html> tag of your entire page — React gives you access via document.documentElement
        if(theme === "dark"){
            html.classList.add("dark");
        }else{
            html.classList.remove("dark")
        }
    }, [theme]);

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

