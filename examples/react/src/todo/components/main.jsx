import { useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import classnames from "classnames";

export function Main({ todos, dispatch, todoOperations }) {
    const { pathname: route } = useLocation();

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
