import { useCallback } from "react";
import { Input } from "./input";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ dispatch, todoOperations }) {
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
