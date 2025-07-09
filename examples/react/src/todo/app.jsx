import { useReducer, useEffect } from "react";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";

import { todoReducer, initialState } from "./reducer";
import { useTodos } from "./hooks/useTodos";
import { SET_ERROR } from "./constants";

import "./app.css";

/**
 * Main TodoMVC application component
 * 
 * Manages the overall application state and provides the main UI structure.
 * Integrates with JSONPlaceholder API for persistent todo storage and includes
 * dark mode theming support.
 * 
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
export function App() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { todos, loading, error } = state;
    const todoOperations = useTodos(dispatch);

    /**
     * Load todos from API on component mount
     */
    useEffect(() => {
        todoOperations.loadTodos();
    }, [todoOperations.loadTodos]);

    /**
     * Dismisses the current error message
     */
    const dismissError = () => dispatch({ type: SET_ERROR, payload: null });

    return (
        <>
            <Header dispatch={dispatch} todoOperations={todoOperations} />
            {error && <ErrorMessage message={error} onDismiss={dismissError} />}
            {loading && <LoadingSpinner />}
            <Main todos={todos} dispatch={dispatch} todoOperations={todoOperations} />
            <Footer todos={todos} dispatch={dispatch} todoOperations={todoOperations} />
        </>
    );
}
