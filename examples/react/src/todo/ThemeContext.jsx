import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('todoapp-theme');
        return saved === 'dark';
    });

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const newTheme = !prev;
            localStorage.setItem('todoapp-theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
