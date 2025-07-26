import React from 'react'

const Button = ({
    type = "button",    // default type
    onClick,            // what happens onClick
    children,           // Button COntent
    disabled = false,   // Should we disable it
    className = ""      // Extra styles if needed
}) => {

    /*
    baseStyles → spacing, padding, rounded, transition  (Universal button styles: padding, rounded, font)
    activeStyles → colors, hover, variant-specific      (Button-specific styles: color, hover, dark/light variants)

    makes it easier to read & maintain.
    */
    const baseStyle = "px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition text-sm sm:text-base";
    
    // Only apply default styles if no custom background or text color is provided
    const hasCustomBg = className.includes('bg-') && !className.includes('bg-primary-light');
    const hasCustomText = className.includes('text-') && !className.includes('text-white');
    
    const activeStyles = disabled 
        ? "bg-primary-light text-white" 
        : hasCustomBg || hasCustomText 
            ? "hover:opacity-90 hover:cursor-pointer" 
            : "bg-primary-light text-white hover:opacity-90 hover:cursor-pointer";
    
    const disabledStyles = "opacity-50 cursor-not-allowed";
    
    return (
        <button onClick={onClick} type={type} className={`${baseStyle} ${activeStyles} ${disabled ? disabledStyles : ""} ${className}`} >{children}</button>
    )
}

export default Button
