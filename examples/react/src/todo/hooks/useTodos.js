import { useCallback } from 'react';
import { todoApi, TodoApiError } from '../services/todoApi';
import { SET_LOADING, SET_ERROR, SET_TODOS, ADD_TODO_SUCCESS, UPDATE_TODO_SUCCESS, REMOVE_TODO_SUCCESS, TOGGLE_ALL, REMOVE_COMPLETED_ITEMS } from '../constants';

/**
 * Custom hook for managing todo operations with API integration
 * 
 * Provides a complete set of todo operations including CRUD operations,
 * error handling, and loading state management. All operations are
 * integrated with the JSONPlaceholder API.
 * 
 * @param {Function} dispatch - Reducer dispatch function for state updates
 * @returns {Object} Object containing all todo operation functions
 * 
 * @example
 * const todoOperations = useTodos(dispatch);
 * await todoOperations.addTodo('New todo item');
 */
export const useTodos = (dispatch) => {
    /**
     * Handles API errors and dispatches appropriate error actions
     * 
     * @param {Error} error - The error object from API operations
     */
    const handleApiError = useCallback((error) => {
        console.error('Todo API Error:', error);
        const message = error instanceof TodoApiError 
            ? `Failed to sync with server: ${error.message}`
            : 'Network error. Please check your connection.';
        dispatch({ type: SET_ERROR, payload: message });
    }, [dispatch]);

    /**
     * Loads all todos from the API
     * 
     * @async
     * @function loadTodos
     * @returns {Promise<void>}
     */
    const loadTodos = useCallback(async () => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            const todos = await todoApi.fetchTodos();
            dispatch({ type: SET_TODOS, payload: todos });
        } catch (error) {
            handleApiError(error);
        }
    }, [dispatch, handleApiError]);

    /**
     * Adds a new todo item
     * 
     * @async
     * @function addTodo
     * @param {string} title - The title of the new todo
     * @returns {Promise<void>}
     */
    const addTodo = useCallback(async (title) => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            const newTodo = await todoApi.createTodo(title);
            dispatch({ type: ADD_TODO_SUCCESS, payload: newTodo });
        } catch (error) {
            handleApiError(error);
        }
    }, [dispatch, handleApiError]);

    /**
     * Updates an existing todo item
     * 
     * @async
     * @function updateTodo
     * @param {number} id - The ID of the todo to update
     * @param {Object} updates - Object containing fields to update
     * @returns {Promise<void>}
     */
    const updateTodo = useCallback(async (id, updates) => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            const updatedTodo = await todoApi.updateTodo(id, updates);
            dispatch({ type: UPDATE_TODO_SUCCESS, payload: updatedTodo });
        } catch (error) {
            handleApiError(error);
        }
    }, [dispatch, handleApiError]);

    /**
     * Deletes a todo item
     * 
     * @async
     * @function deleteTodo
     * @param {number} id - The ID of the todo to delete
     * @returns {Promise<void>}
     */
    const deleteTodo = useCallback(async (id) => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            await todoApi.deleteTodo(id);
            dispatch({ type: REMOVE_TODO_SUCCESS, payload: id });
        } catch (error) {
            handleApiError(error);
        }
    }, [dispatch, handleApiError]);

    /**
     * Toggles the completion status of a todo item
     * 
     * @async
     * @function toggleTodo
     * @param {number} id - The ID of the todo to toggle
     * @param {boolean} completed - New completion status
     * @returns {Promise<void>}
     */
    const toggleTodo = useCallback(async (id, completed) => {
        dispatch({ type: SET_LOADING, payload: true });
        try {
            const updatedTodo = await todoApi.toggleTodo(id, completed);
            dispatch({ type: UPDATE_TODO_SUCCESS, payload: updatedTodo });
        } catch (error) {
            handleApiError(error);
        }
    }, [dispatch, handleApiError]);

    /**
     * Toggles all todos to the specified completion status
     * 
     * @function toggleAll
     * @param {boolean} completed - Completion status to set for all todos
     */
    const toggleAll = useCallback((completed) => {
        dispatch({ type: TOGGLE_ALL, payload: { completed } });
    }, [dispatch]);

    /**
     * Removes all completed todos from the list
     * 
     * @function clearCompleted
     */
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
