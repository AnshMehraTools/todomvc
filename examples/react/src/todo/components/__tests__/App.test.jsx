import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { App } from '../../app';
import { todoApi } from '../../services/todoApi';
import { ThemeProvider } from '../../ThemeContext';

jest.mock('../../services/todoApi');

const mockTodos = [
    { id: 1, title: 'Test todo 1', completed: false, userId: 1 },
    { id: 2, title: 'Test todo 2', completed: true, userId: 1 }
];

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        todoApi.fetchTodos.mockResolvedValue(mockTodos);
    });

    test('renders app with header and loads todos', async () => {
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        );
        
        expect(screen.getByText('todos')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
        
        await waitFor(() => {
            expect(screen.getByText('Test todo 1')).toBeInTheDocument();
            expect(screen.getByText('Test todo 2')).toBeInTheDocument();
        });
    });

    test('shows loading spinner while fetching todos', () => {
        todoApi.fetchTodos.mockImplementation(() => new Promise(() => {}));
        
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        );
        
        expect(screen.getByText('Loading todos...')).toBeInTheDocument();
    });

    test('shows error message when API fails', async () => {
        todoApi.fetchTodos.mockRejectedValue(new Error('API Error'));
        
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByText(/Network error. Please check your connection/)).toBeInTheDocument();
        });
    });

    test('adds new todo', async () => {
        const user = userEvent.setup();
        const newTodo = { id: 3, title: 'New todo', completed: false, userId: 1 };
        todoApi.createTodo.mockResolvedValue(newTodo);
        
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByText('Test todo 1')).toBeInTheDocument();
        });
        
        const input = screen.getByPlaceholderText('What needs to be done?');
        await user.type(input, 'New todo');
        await user.keyboard('{Enter}');
        
        await waitFor(() => {
            expect(todoApi.createTodo).toHaveBeenCalledWith('New todo');
        });
    });

    test('toggles todo completion', async () => {
        const user = userEvent.setup();
        const updatedTodo = { ...mockTodos[0], completed: true };
        todoApi.toggleTodo.mockResolvedValue(updatedTodo);
        
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByText('Test todo 1')).toBeInTheDocument();
        });
        
        const checkbox = screen.getAllByRole('checkbox')[1];
        await user.click(checkbox);
        
        await waitFor(() => {
            expect(todoApi.toggleTodo).toHaveBeenCalledWith(1, true);
        });
    });

    test('deletes todo', async () => {
        const user = userEvent.setup();
        todoApi.deleteTodo.mockResolvedValue();
        
        render(
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByText('Test todo 1')).toBeInTheDocument();
        });
        
        const deleteButton = screen.getAllByRole('button').find(btn => 
            btn.className.includes('destroy')
        );
        await user.click(deleteButton);
        
        await waitFor(() => {
            expect(todoApi.deleteTodo).toHaveBeenCalledWith(1);
        });
    });
});
