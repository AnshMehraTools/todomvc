import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Main } from '../main';

const mockTodos = [
    { id: 1, title: 'Active todo', completed: false },
    { id: 2, title: 'Completed todo', completed: true }
];

const mockTodoOperations = {
    toggleTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
    toggleAll: jest.fn()
};

describe('Main', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders todo list', () => {
        render(
            <BrowserRouter>
                <Main todos={mockTodos} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        expect(screen.getByText('Active todo')).toBeInTheDocument();
        expect(screen.getByText('Completed todo')).toBeInTheDocument();
    });

    test('renders empty main when no todos', () => {
        render(
            <BrowserRouter>
                <Main todos={[]} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        expect(screen.getByTestId('main')).toBeInTheDocument();
        expect(screen.getByTestId('todo-list')).toBeInTheDocument();
        expect(screen.queryByTestId('todo-item')).not.toBeInTheDocument();
    });

    test('toggle all checkbox works correctly', async () => {
        const user = userEvent.setup();
        
        render(
            <BrowserRouter>
                <Main todos={mockTodos} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        const toggleAllCheckbox = screen.getByLabelText('Toggle All Input');
        await user.click(toggleAllCheckbox);
        
        expect(mockTodoOperations.toggleAll).toHaveBeenCalledWith(true);
    });

    test('toggle all is checked when all todos are completed', () => {
        const completedTodos = mockTodos.map(todo => ({ ...todo, completed: true }));
        
        render(
            <BrowserRouter>
                <Main todos={completedTodos} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        const toggleAllCheckbox = screen.getByLabelText('Toggle All Input');
        expect(toggleAllCheckbox).toBeChecked();
    });

    test('toggle all is unchecked when not all todos are completed', () => {
        render(
            <BrowserRouter>
                <Main todos={mockTodos} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        const toggleAllCheckbox = screen.getByLabelText('Toggle All Input');
        expect(toggleAllCheckbox).not.toBeChecked();
    });

    test('renders correct number of todo items', () => {
        render(
            <BrowserRouter>
                <Main todos={mockTodos} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        const todoItems = screen.getAllByTestId('todo-item');
        expect(todoItems).toHaveLength(2);
    });
});
