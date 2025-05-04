import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has previously set a preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Otherwise check for system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Colors for light and dark themes
  const lightTheme = {
    primary: '#EB5B00', // Orange
    secondary: '#FF9D23', // Light Orange
    accent: '#FCB454', // Very Light Orange
    success: '#4CAF50', // Green
    danger: '#F44336', // Red
    warning: '#FFC107', // Amber
    info: '#2196F3', // Blue
    background: '#F8F9FA', // Light Background
    surface: '#FFFFFF', // White
    text: '#212529', // Dark Text
    textSecondary: '#6C757D', // Gray Text
    border: '#DEE2E6', // Light Gray
    divider: '#E9ECEF', // Lighter Gray
  };

  const darkTheme = {
    primary: '#EB5B00', // Keep same primary for brand consistency
    secondary: '#FF9D23', // Darker Blue
    accent: '#FCB454', // Even Darker Blue
    success: '#388E3C', // Darker Green
    danger: '#D32F2F', // Darker Red
    warning: '#FFA000', // Darker Amber
    info: '#1976D2', // Darker Blue
    background: '#121212', // Dark Background
    surface: '#1E1E1E', // Slightly Lighter Dark
    text: '#E0E0E0', // Light Text
    textSecondary: '#BDBDBD', // Gray Text
    border: '#333333', // Dark Gray
    divider: '#424242', // Lighter Gray
  };

  // Get current theme colors
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Apply theme to document root for CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Set theme in local storage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Apply theme class to body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    
    // Set CSS variables
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [isDarkMode, theme]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 