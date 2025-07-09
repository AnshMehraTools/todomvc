import { renderHook, act } from '@testing-library/react-hooks';
import { useTodos } from '../useTodos';
import { todoApi } from '../../services/todoApi';

jest.mock('../../services/todoApi');

describe('useTodos', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('loadTodos dispatches loading and success actions', async () => {
        const mockTodos = [{ id: 1, title: 'Test todo', completed: false }];
        todoApi.fetchTodos.mockResolvedValue(mockTodos);

        const { result } = renderHook(() => useTodos(mockDispatch));

        await act(async () => {
            await result.current.loadTodos();
        });

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_TODOS', payload: mockTodos });
    });

    test('loadTodos dispatches error action on failure', async () => {
        const error = new Error('API Error');
        todoApi.fetchTodos.mockRejectedValue(error);

        const { result } = renderHook(() => useTodos(mockDispatch));

        await act(async () => {
            await result.current.loadTodos();
        });

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
        expect(mockDispatch).toHaveBeenCalledWith({ 
            type: 'SET_ERROR', 
            payload: 'Network error. Please check your connection.' 
        });
    });

    test('addTodo dispatches loading and success actions', async () => {
        const newTodo = { id: 1, title: 'New todo', completed: false };
        todoApi.createTodo.mockResolvedValue(newTodo);

        const { result } = renderHook(() => useTodos(mockDispatch));

        await act(async () => {
            await result.current.addTodo('New todo');
        });

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'ADD_TODO_SUCCESS', payload: newTodo });
    });

    test('updateTodo dispatches loading and success actions', async () => {
        const updatedTodo = { id: 1, title: 'Updated todo', completed: true };
        todoApi.updateTodo.mockResolvedValue(updatedTodo);

        const { result } = renderHook(() => useTodos(mockDispatch));

        await act(async () => {
            await result.current.updateTodo(1, { title: 'Updated todo' });
        });

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPDATE_TODO_SUCCESS', payload: updatedTodo });
    });

    test('deleteTodo dispatches loading and success actions', async () => {
        todoApi.deleteTodo.mockResolvedValue();

        const { result } = renderHook(() => useTodos(mockDispatch));

        await act(async () => {
            await result.current.deleteTodo(1);
        });

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'REMOVE_TODO_SUCCESS', payload: 1 });
    });

    test('toggleTodo dispatches loading and success actions', async () => {
        const toggledTodo = { id: 1, title: 'Test todo', completed: true };
        todoApi.toggleTodo.mockResolvedValue(toggledTodo);

        const { result } = renderHook(() => useTodos(mockDispatch));

        await act(async () => {
            await result.current.toggleTodo(1, true);
        });

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPDATE_TODO_SUCCESS', payload: toggledTodo });
    });

    test('toggleAll dispatches correct action', () => {
        const { result } = renderHook(() => useTodos(mockDispatch));

        act(() => {
            result.current.toggleAll(true);
        });

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'TOGGLE_ALL', payload: { completed: true } });
    });

    test('clearCompleted dispatches correct action', () => {
        const { result } = renderHook(() => useTodos(mockDispatch));

        act(() => {
            result.current.clearCompleted();
        });

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'REMOVE_COMPLETED_ITEMS' });
    });
});
