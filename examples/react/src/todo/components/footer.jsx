import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";

/**
 * Footer component displaying todo count, filters, and clear completed button
 * 
 * Shows the count of remaining active todos, filter navigation links, and
 * a button to clear completed todos. Only renders when there are todos present.
 * Supports route-based filtering and highlights the current filter.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.todos - Array of todo objects
 * @param {Function} props.dispatch - Reducer dispatch function (legacy)
 * @param {Object} props.todoOperations - Todo operations object from useTodos hook
 * @param {Function} props.todoOperations.clearCompleted - Function to clear completed todos
 * @returns {JSX.Element|null} Footer component or null if no todos
 * 
 * @example
 * <Footer todos={todos} dispatch={dispatch} todoOperations={todoOperations} />
 */
export function Footer({ todos, dispatch, todoOperations }) {
    const { pathname: route } = useLocation();

    /**
     * Calculates active (non-completed) todos
     */
    const activeTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);

    /**
     * Handles clearing all completed todos
     */
    const removeCompleted = useCallback(() => {
        todoOperations.clearCompleted();
    }, [todoOperations]);

    // prettier-ignore
    if (todos.length === 0)
        return null;

    return (
        <footer className="footer" data-testid="footer">
            <span className="todo-count">{`${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`}</span>
            <ul className="filters" data-testid="footer-navigation">
                <li>
                    <a className={classnames({ selected: route === "/" })} href="#/">
                        All
                    </a>
                </li>
                <li>
                    <a className={classnames({ selected: route === "/active" })} href="#/active">
                        Active
                    </a>
                </li>
                <li>
                    <a className={classnames({ selected: route === "/completed" })} href="#/completed">
                        Completed
                    </a>
                </li>
            </ul>
            <button className="clear-completed" disabled={activeTodos.length === todos.length} onClick={removeCompleted}>
                Clear completed
            </button>
        </footer>
    );
}
