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

export function App() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { todos, loading, error } = state;
    const todoOperations = useTodos(dispatch);

    useEffect(() => {
        todoOperations.loadTodos();
    }, [todoOperations.loadTodos]);

    return (
        <>
            <Header dispatch={dispatch} todoOperations={todoOperations} />
            {error && <ErrorMessage message={error} onDismiss={() => dispatch({ type: SET_ERROR, payload: null })} />}
            {loading && <LoadingSpinner />}
            <Main todos={todos} dispatch={dispatch} todoOperations={todoOperations} />
            <Footer todos={todos} dispatch={dispatch} todoOperations={todoOperations} />
        </>
    );
}
