import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Theme toggle button component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.showLabel=false] - Whether to show a text label
 * @param {Object} [props.style={}] - Additional inline styles
 */
function ThemeToggleButton({ 
  className = '',
  showLabel = false,
  style = {},
  ...rest
}) {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button
      className={`btn theme-toggle-btn ${className}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      style={style}
      {...rest}
    >
      <div className="theme-toggle-icon-container">
        <i className={`bi ${isDarkMode ? "bi-sun" : "bi-moon"}`}></i>
      </div>
      {showLabel && (
        <span className="ms-2 theme-toggle-label">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}

export default ThemeToggleButton; 