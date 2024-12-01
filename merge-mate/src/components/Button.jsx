import React from "react";

const Button = ({ 
  children, 
  variant = "primary", // primary, outline-primary, outline-dark, navbar
  onClick, 
  className = "",
  as: Component = "button",
  ...props 
}) => {
  const getButtonClass = () => {
    const baseClasses = "btn shadow-sm hover-effect";
    switch (variant) {
      case "navbar":
        return `${baseClasses} btn-dark ${className}`;
      case "outline-primary":
        return `${baseClasses} btn-outline-primary ${className}`;
      case "outline-dark":
        return `${baseClasses} btn-outline-dark ${className}`;
      default:
        return `${baseClasses} btn-primary ${className}`;
    }
  };

  return (
    <Component 
      className={getButtonClass()}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button; 