import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../ThemeContext';

const TestComponent = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme">{isDarkMode ? 'dark' : 'light'}</span>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorage.clear();
        document.body.className = '';
    });

    test('provides default light theme', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(document.body.className).toBe('light-theme');
    });

    test('loads theme from localStorage', () => {
        localStorage.setItem('todoapp-theme', 'dark');

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(document.body.className).toBe('dark-theme');
    });

    test('toggles theme and updates localStorage', async () => {
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const toggleButton = screen.getByText('Toggle Theme');
        
        await user.click(toggleButton);

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(localStorage.getItem('todoapp-theme')).toBe('dark');
        expect(document.body.className).toBe('dark-theme');

        await user.click(toggleButton);

        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(localStorage.getItem('todoapp-theme')).toBe('light');
        expect(document.body.className).toBe('light-theme');
    });

    test('applies dark-theme class to body when dark theme is active', () => {
        localStorage.setItem('todoapp-theme', 'dark');

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(document.body.className).toBe('dark-theme');
    });

    test('removes dark-theme class from body when light theme is active', async () => {
        const user = userEvent.setup();
        localStorage.setItem('todoapp-theme', 'dark');

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(document.body.className).toBe('dark-theme');

        const toggleButton = screen.getByText('Toggle Theme');
        await user.click(toggleButton);

        expect(document.body.className).toBe('light-theme');
    });
});
