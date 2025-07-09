import { todoApi, TodoApiError } from '../todoApi';

global.fetch = jest.fn();

describe('todoApi', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    describe('fetchTodos', () => {
        test('fetches todos successfully', async () => {
            const mockTodos = [
                { id: 1, title: 'Test todo', completed: false, userId: 1 }
            ];
            
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockTodos
            });

            const result = await todoApi.fetchTodos();

            expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos?userId=1');
            expect(result).toEqual(mockTodos);
        });

        test('throws TodoApiError on failed request', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error'
            });

            await expect(todoApi.fetchTodos()).rejects.toThrow(TodoApiError);
        });
    });

    describe('createTodo', () => {
        test('creates todo successfully', async () => {
            const newTodo = { id: 1, title: 'New todo', completed: false, userId: 1 };
            
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => newTodo
            });

            const result = await todoApi.createTodo('New todo');

            expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'New todo',
                    completed: false,
                    userId: 1
                })
            });
            expect(result).toEqual(newTodo);
        });
    });

    describe('updateTodo', () => {
        test('updates todo successfully', async () => {
            const updatedTodo = { id: 1, title: 'Updated todo', completed: true, userId: 1 };
            
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => updatedTodo
            });

            const result = await todoApi.updateTodo(1, { title: 'Updated todo', completed: true });

            expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'Updated todo', completed: true })
            });
            expect(result).toEqual(updatedTodo);
        });
    });

    describe('deleteTodo', () => {
        test('deletes todo successfully', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({})
            });

            await todoApi.deleteTodo(1);

            expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
                method: 'DELETE'
            });
        });
    });

    describe('toggleTodo', () => {
        test('toggles todo completion', async () => {
            const toggledTodo = { id: 1, title: 'Test todo', completed: true, userId: 1 };
            
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => toggledTodo
            });

            const result = await todoApi.toggleTodo(1, true);

            expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: true })
            });
            expect(result).toEqual(toggledTodo);
        });
    });
});
