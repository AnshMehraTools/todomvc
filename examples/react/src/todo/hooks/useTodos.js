import { useCallback } from 'react';
import { todoApi, TodoApiError } from '../services/todoApi';
import { SET_LOADING, SET_ERROR, SET_TODOS, ADD_TODO_SUCCESS, UPDATE_TODO_SUCCESS, REMOVE_TODO_SUCCESS, TOGGLE_ALL, REMOVE_COMPLETED_ITEMS } from '../constants';

export const useTodos = (dispatch) => {
    const handleApiError = useCallback((error) => {
        console.error('Todo API Error:', error);
        const message = error instanceof TodoApiError 
            ? `Failed to sync with server: ${error.message}`
            : 'Network error. Please check your connection.';
        dispatch({ type: SET_ERROR, payload: message });
    }, [dispatch]);

    const loadTodos = useCallback(async () => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            const todos = await todoApi.fetchTodos();
            dispatch({ type: SET_TODOS, payload: todos });
        } catch (error) {
            handleApiError(error);
        }
    }, [dispatch, handleApiError]);

    const addTodo = useCallback(async (title) => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            const newTodo = await todoApi.createTodo(title);
            dispatch({ type: ADD_TODO_SUCCESS, payload: newTodo });
        } catch (error) {
            handleApiError(error);
        }
    }, [dispatch, handleApiError]);

    const updateTodo = useCallback(async (id, updates) => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            const updatedTodo = await todoApi.updateTodo(id, updates);
            dispatch({ type: UPDATE_TODO_SUCCESS, payload: updatedTodo });
        } catch (error) {
            handleApiError(error);
        }
    }, [dispatch, handleApiError]);

    const deleteTodo = useCallback(async (id) => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            await todoApi.deleteTodo(id);
            dispatch({ type: REMOVE_TODO_SUCCESS, payload: id });
        } catch (error) {
            handleApiError(error);
        }
    }, [dispatch, handleApiError]);

    const toggleTodo = useCallback(async (id, completed) => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            const updatedTodo = await todoApi.toggleTodo(id, completed);
            dispatch({ type: UPDATE_TODO_SUCCESS, payload: updatedTodo });
        } catch (error) {
            handleApiError(error);
        }
    }, [dispatch, handleApiError]);

    const toggleAll = useCallback((completed) => {
        dispatch({ type: TOGGLE_ALL, payload: { completed } });
    }, [dispatch]);

    const clearCompleted = useCallback(() => {
        dispatch({ type: REMOVE_COMPLETED_ITEMS });
    }, [dispatch]);

    return {
        loadTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        toggleAll,
        clearCompleted
    };
};
