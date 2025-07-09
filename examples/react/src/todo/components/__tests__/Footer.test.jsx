import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../footer';

const mockTodos = [
    { id: 1, title: 'Active todo 1', completed: false },
    { id: 2, title: 'Active todo 2', completed: false },
    { id: 3, title: 'Completed todo', completed: true }
];

const mockTodoOperations = {
    clearCompleted: jest.fn()
};

describe('Footer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('does not render when no todos', () => {
        const { container } = render(
            <BrowserRouter>
                <Footer todos={[]} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        expect(container.firstChild).toBeNull();
    });

    test('displays correct item count for single item', () => {
        const singleTodo = [{ id: 1, title: 'Single todo', completed: false }];
        
        render(
            <BrowserRouter>
                <Footer todos={singleTodo} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        expect(screen.getByText('1 item left!')).toBeInTheDocument();
    });

    test('displays correct item count for multiple items', () => {
        render(
            <BrowserRouter>
                <Footer todos={mockTodos} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        expect(screen.getByText('2 items left!')).toBeInTheDocument();
    });

    test('shows clear completed button when there are completed todos', () => {
        render(
            <BrowserRouter>
                <Footer todos={mockTodos} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        expect(screen.getByText('Clear completed')).toBeInTheDocument();
    });

    test('disables clear completed button when no completed todos', () => {
        const activeTodos = mockTodos.filter(todo => !todo.completed);
        
        render(
            <BrowserRouter>
                <Footer todos={activeTodos} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        const clearButton = screen.getByText('Clear completed');
        expect(clearButton).toBeInTheDocument();
        expect(clearButton).toBeDisabled();
    });

    test('calls clearCompleted when button is clicked', async () => {
        const user = userEvent.setup();
        
        render(
            <BrowserRouter>
                <Footer todos={mockTodos} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        const clearButton = screen.getByText('Clear completed');
        await user.click(clearButton);
        
        expect(mockTodoOperations.clearCompleted).toHaveBeenCalled();
    });

    test('renders filter links', () => {
        render(
            <BrowserRouter>
                <Footer todos={mockTodos} todoOperations={mockTodoOperations} />
            </BrowserRouter>
        );
        
        expect(screen.getByText('All')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
    });
});
