import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";

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
    labelDark = true,
    isPassword = false

}) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    const baseStyles = "w-full px-4 py-2 rounded-md border outline-none transition text-sm sm:text-base";

    const activeStyles = disabled
        ? "bg-secondary-light text-text-muted cursor-not-allowed"
        : "bg-background-light text-text-light border-gray-300 focus:ring-1 focus:ring-primary-light ";
    const darkStyles = applyDark
        ? "dark:bg-background-dark dark:text-text-dark dark:border-gray-600 dark:focus:ring-primary-dark"
        : "";
    const labelStyle = labelDark ? "dark:text-text-dark" : ""

    return (
        <div className='relative'>
            <label className={`${labelStyle} text-sm sm:text-base`} htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={inputType}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`${baseStyles} ${activeStyles} ${className} ${darkStyles} pr-10`}
            />
            {isPassword && (
                <span onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-[36px] cursor-pointer text-gray-500'
                >
                    {showPassword ? <FiEyeOff/> : <FiEye/>}
                </span>
            )}
        </div>
    )
}

export default Input
