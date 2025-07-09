import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

/**
 * Custom hook for accessing theme context
 * 
 * Provides access to current theme state and theme toggle function.
 * Must be used within a ThemeProvider component.
 * 
 * @returns {Object} Theme context object
 * @returns {boolean} returns.isDarkMode - Current theme state (true for dark, false for light)
 * @returns {Function} returns.toggleTheme - Function to toggle theme
 * @throws {Error} When used outside of ThemeProvider
 * 
 * @example
 * const { isDarkMode, toggleTheme } = useTheme();
 * console.log(isDarkMode); // true or false
 * toggleTheme(); // Switches theme
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

/**
 * Theme provider component that manages light/dark theme state
 * 
 * Provides theme context to child components and handles theme persistence
 * in localStorage. Automatically applies theme classes to document body.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Theme provider wrapper
 * 
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('todoapp-theme');
        return saved === 'dark';
    });

    /**
     * Toggles between light and dark themes and persists to localStorage
     */
    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const newTheme = !prev;
            localStorage.setItem('todoapp-theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };

    /**
     * Applies theme classes to document body when theme changes
     */
    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
