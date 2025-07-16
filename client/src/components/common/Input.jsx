import React from 'react'

const Input = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    className = "",
    applyDark = true,
    labelDark = true

}) => {

    const baseStyles = "w-full px-4 py-2 rounded-md border outline-none transition text-sm";
    
    const activeStyles = disabled ? "bg-secondary-light text-text-muted cursor-not-allowed" : 
    "bg-background-light text-text-light border-gray-300 focus:ring-1 focus:ring-primary-light ";
    const darkStyles = applyDark ? "dark:bg-background-dark dark:text-text-dark dark:border-gray-600 dark:focus:ring-primary-dark" : "";

    const labelStyle = labelDark ? "dark:text-text-dark" : ""
    return (
        <div>
            <label className= {`${labelStyle}`} htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`${baseStyles} ${activeStyles} ${className} ${darkStyles}`}
            />
        </div>
    )
}

export default Input
