import { useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import classnames from "classnames";

/**
 * Main section component containing the todo list and toggle all functionality
 * 
 * Renders the main content area with a toggle-all checkbox and the list of todos.
 * Supports filtering todos based on route (all, active, completed). Handles bulk 
 * operations on all todos through the toggle-all checkbox.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.todos - Array of todo objects
 * @param {Function} props.dispatch - Reducer dispatch function (legacy)
 * @param {Object} props.todoOperations - Todo operations object from useTodos hook
 * @param {Function} props.todoOperations.toggleAll - Function to toggle all todos
 * @returns {JSX.Element} Main component
 * 
 * @example
 * <Main todos={todos} dispatch={dispatch} todoOperations={todoOperations} />
 */
export function Main({ todos, dispatch, todoOperations }) {
    const { pathname: route } = useLocation();

    /**
     * Filters todos based on current route
     */
    const visibleTodos = useMemo(
        () =>
            todos.filter((todo) => {
                if (route === "/active")
                    return !todo.completed;

                if (route === "/completed")
                    return todo.completed;

                return todo;
            }),
        [todos, route]
    );

    /**
     * Handles toggling all todos to completed or active
     * 
     * @param {Event} e - Checkbox change event
     */
    const toggleAll = useCallback((e) => {
        todoOperations.toggleAll(e.target.checked);
    }, [todoOperations]);

    return (
        <main className="main" data-testid="main">
            {visibleTodos.length > 0 ? (
                <div className="toggle-all-container">
                    <input className="toggle-all" type="checkbox" id="toggle-all" data-testid="toggle-all" checked={visibleTodos.every((todo) => todo.completed)} onChange={toggleAll} />
                    <label className="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            ) : null}
            <ul className={classnames("todo-list")} data-testid="todo-list">
                {visibleTodos.map((todo, index) => (
                    <Item todo={todo} key={todo.id} dispatch={dispatch} todoOperations={todoOperations} index={index} />
                ))}
            </ul>
        </main>
    );
}
