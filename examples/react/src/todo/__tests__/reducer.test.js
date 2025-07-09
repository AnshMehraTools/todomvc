import { todoReducer } from '../reducer';
import { 
    SET_LOADING, 
    SET_ERROR, 
    SET_TODOS, 
    ADD_TODO_SUCCESS, 
    UPDATE_TODO_SUCCESS, 
    REMOVE_TODO_SUCCESS,
    TOGGLE_ALL,
    REMOVE_COMPLETED_ITEMS
} from '../constants';

describe('todoReducer', () => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    };

    test('handles SET_LOADING action', () => {
        const action = { type: SET_LOADING, payload: true };
        const newState = todoReducer(initialState, action);

        expect(newState).toEqual({
            todos: [],
            loading: true,
            error: null
        });
    });

    test('handles SET_ERROR action', () => {
        const action = { type: SET_ERROR, payload: 'Test error' };
        const newState = todoReducer(initialState, action);

        expect(newState).toEqual({
            todos: [],
            loading: false,
            error: 'Test error'
        });
    });

    test('handles SET_TODOS action', () => {
        const todos = [
            { id: 1, title: 'Test todo 1', completed: false },
            { id: 2, title: 'Test todo 2', completed: true }
        ];
        const action = { type: SET_TODOS, payload: todos };
        const newState = todoReducer(initialState, action);

        expect(newState).toEqual({
            todos: todos,
            loading: false,
            error: null
        });
    });

    test('handles ADD_TODO_SUCCESS action', () => {
        const existingState = {
            todos: [{ id: 1, title: 'Existing todo', completed: false }],
            loading: true,
            error: null
        };
        const newTodo = { id: 2, title: 'New todo', completed: false };
        const action = { type: ADD_TODO_SUCCESS, payload: newTodo };
        const newState = todoReducer(existingState, action);

        expect(newState).toEqual({
            todos: [
                { id: 1, title: 'Existing todo', completed: false },
                { id: 2, title: 'New todo', completed: false }
            ],
            loading: false,
            error: null
        });
    });

    test('handles UPDATE_TODO_SUCCESS action', () => {
        const existingState = {
            todos: [
                { id: 1, title: 'Todo 1', completed: false },
                { id: 2, title: 'Todo 2', completed: false }
            ],
            loading: true,
            error: null
        };
        const updatedTodo = { id: 1, title: 'Updated Todo 1', completed: true };
        const action = { type: UPDATE_TODO_SUCCESS, payload: updatedTodo };
        const newState = todoReducer(existingState, action);

        expect(newState).toEqual({
            todos: [
                { id: 1, title: 'Updated Todo 1', completed: true },
                { id: 2, title: 'Todo 2', completed: false }
            ],
            loading: false,
            error: null
        });
    });

    test('handles REMOVE_TODO_SUCCESS action', () => {
        const existingState = {
            todos: [
                { id: 1, title: 'Todo 1', completed: false },
                { id: 2, title: 'Todo 2', completed: true }
            ],
            loading: true,
            error: null
        };
        const action = { type: REMOVE_TODO_SUCCESS, payload: 1 };
        const newState = todoReducer(existingState, action);

        expect(newState).toEqual({
            todos: [
                { id: 2, title: 'Todo 2', completed: true }
            ],
            loading: false,
            error: null
        });
    });

    test('handles TOGGLE_ALL action', () => {
        const existingState = {
            todos: [
                { id: 1, title: 'Todo 1', completed: false },
                { id: 2, title: 'Todo 2', completed: false }
            ],
            loading: false,
            error: null
        };
        const action = { type: TOGGLE_ALL, payload: { completed: true } };
        const newState = todoReducer(existingState, action);

        expect(newState).toEqual({
            todos: [
                { id: 1, title: 'Todo 1', completed: true },
                { id: 2, title: 'Todo 2', completed: true }
            ],
            loading: false,
            error: null
        });
    });

    test('handles REMOVE_COMPLETED_ITEMS action', () => {
        const existingState = {
            todos: [
                { id: 1, title: 'Active todo', completed: false },
                { id: 2, title: 'Completed todo', completed: true }
            ],
            loading: false,
            error: null
        };
        const action = { type: REMOVE_COMPLETED_ITEMS };
        const newState = todoReducer(existingState, action);

        expect(newState).toEqual({
            todos: [
                { id: 1, title: 'Active todo', completed: false }
            ],
            loading: false,
            error: null
        });
    });

    test('throws error for unknown action', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        
        expect(() => todoReducer(initialState, action)).toThrow('Unknown action: UNKNOWN_ACTION');
    });
});
