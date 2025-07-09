import { useCallback } from "react";
import { Input } from "./input";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Header component containing the app title, theme toggle, and new todo input
 * 
 * Renders the main header section with the TodoMVC title, theme toggle button,
 * and input field for creating new todos. Handles todo creation through the
 * provided todo operations.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.dispatch - Reducer dispatch function (legacy)
 * @param {Object} props.todoOperations - Todo operations object from useTodos hook
 * @param {Function} props.todoOperations.addTodo - Function to add new todo
 * @returns {JSX.Element} Header component
 * 
 * @example
 * <Header dispatch={dispatch} todoOperations={todoOperations} />
 */
export function Header({ dispatch, todoOperations }) {
    /**
     * Handles adding a new todo item
     * 
     * @param {string} title - The title of the new todo
     */
    const addItem = useCallback((title) => {
        todoOperations.addTodo(title);
    }, [todoOperations]);

    return (
        <header className="header" data-testid="header">
            <div className="header-top">
                <h1>todos</h1>
                <ThemeToggle />
            </div>
            <Input onSubmit={addItem} label="New Todo Input" placeholder="What needs to be done?" />
        </header>
    );
}
