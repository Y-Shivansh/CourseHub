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
    className = ""

}) => {

    const baseStyles = "w-full px-4 py-2 rounded-md border outline-none transition text-sm";
    
    const activeStyles = disabled ? "bg-secondary-light text-text-muted cursor-not-allowed dark:bg-secondary-dark" : 
    "bg-background-light text-text-light border-gray-300 focus:ring-1 focus:ring-primary-light dark:bg-background-dark dark:text-text-dark dark:border-gray-600 dark:focus:ring-primary-dark";

    return (
        <div>
            <label className='dark:text-text-dark' htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`${baseStyles} ${activeStyles} ${className}`}
            />
        </div>
    )
}

export default Input
