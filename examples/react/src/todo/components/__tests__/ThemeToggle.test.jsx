import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '../ThemeToggle';
import { ThemeProvider, useTheme } from '../../ThemeContext';

const ThemeDisplay = () => {
    const { isDarkMode } = useTheme();
    return <div data-testid="theme-display">{isDarkMode ? 'dark' : 'light'}</div>;
};

const ThemeToggleWithProvider = () => (
    <ThemeProvider>
        <ThemeToggle />
        <ThemeDisplay />
    </ThemeProvider>
);

describe('ThemeToggle', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders theme toggle button', () => {
        render(<ThemeToggleWithProvider />);
        
        expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
    });

    test('starts with light theme by default', () => {
        render(<ThemeToggleWithProvider />);
        
        expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
    });

    test('toggles to dark theme when clicked', async () => {
        const user = userEvent.setup();
        
        render(<ThemeToggleWithProvider />);
        
        const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i });
        await user.click(toggleButton);
        
        expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
    });

    test('toggles back to light theme when clicked again', async () => {
        const user = userEvent.setup();
        
        render(<ThemeToggleWithProvider />);
        
        const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i });
        await user.click(toggleButton);
        await user.click(toggleButton);
        
        expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
    });

    test('persists theme preference in localStorage', async () => {
        const user = userEvent.setup();
        
        render(<ThemeToggleWithProvider />);
        
        const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i });
        await user.click(toggleButton);
        
        expect(localStorage.getItem('todoapp-theme')).toBe('dark');
    });

    test('loads theme from localStorage on mount', () => {
        localStorage.setItem('todoapp-theme', 'dark');
        
        render(<ThemeToggleWithProvider />);
        
        expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
    });
});
