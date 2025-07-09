import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../header';
import { ThemeProvider } from '../../ThemeContext';

const mockTodoOperations = {
    addTodo: jest.fn()
};

const mockDispatch = jest.fn();

const HeaderWithTheme = ({ children }) => (
    <ThemeProvider>
        {children}
    </ThemeProvider>
);

describe('Header', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders header with title and input', () => {
        render(
            <HeaderWithTheme>
                <Header dispatch={mockDispatch} todoOperations={mockTodoOperations} />
            </HeaderWithTheme>
        );
        
        expect(screen.getByText('todos')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
    });

    test('calls addTodo when form is submitted', async () => {
        const user = userEvent.setup();
        
        render(
            <HeaderWithTheme>
                <Header dispatch={mockDispatch} todoOperations={mockTodoOperations} />
            </HeaderWithTheme>
        );
        
        const input = screen.getByPlaceholderText('What needs to be done?');
        await user.type(input, 'New todo item');
        await user.keyboard('{Enter}');
        
        expect(mockTodoOperations.addTodo).toHaveBeenCalledWith('New todo item');
    });

    test('does not submit empty todo', async () => {
        const user = userEvent.setup();
        
        render(
            <HeaderWithTheme>
                <Header dispatch={mockDispatch} todoOperations={mockTodoOperations} />
            </HeaderWithTheme>
        );
        
        const input = screen.getByPlaceholderText('What needs to be done?');
        await user.keyboard('{Enter}');
        
        expect(mockTodoOperations.addTodo).not.toHaveBeenCalled();
    });

    test('clears input after submission', async () => {
        const user = userEvent.setup();
        
        render(
            <HeaderWithTheme>
                <Header dispatch={mockDispatch} todoOperations={mockTodoOperations} />
            </HeaderWithTheme>
        );
        
        const input = screen.getByPlaceholderText('What needs to be done?');
        await user.type(input, 'New todo item');
        await user.keyboard('{Enter}');
        
        expect(input.value).toBe('');
    });
});
