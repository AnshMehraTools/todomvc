import { memo, useState, useCallback } from "react";
import classnames from "classnames";

import { Input } from "./input";

export const Item = memo(function Item({ todo, dispatch, todoOperations }) {
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id } = todo;

    const toggleItem = useCallback(() => {
        todoOperations.toggleTodo(id, !completed);
    }, [todoOperations, id, completed]);

    const removeItem = useCallback(() => {
        todoOperations.deleteTodo(id);
    }, [todoOperations, id]);

    const updateItem = useCallback((newTitle) => {
        todoOperations.updateTodo(id, { title: newTitle });
    }, [todoOperations, id]);

    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsWritable(false);
    }, []);

    const handleUpdate = useCallback(
        (title) => {
            if (title.length === 0) {
                removeItem();
            } else {
                updateItem(title);
            }
            setIsWritable(false);
        },
        [removeItem, updateItem]
    );

    return (
        <li className={classnames({ completed: todo.completed })} data-testid="todo-item">
            <div className="view">
                {isWritable ? (
                    <Input onSubmit={handleUpdate} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
                ) : (
                    <>
                        <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={toggleItem} />
                        <label data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                            {title}
                        </label>
                        <button className="destroy" data-testid="todo-item-button" onClick={removeItem} />
                    </>
                )}
            </div>
        </li>
    );
});
