import { memo, useState, useCallback } from "react";
import classnames from "classnames";

import { Input } from "./input";

/**
 * Individual todo item component with editing capabilities
 * 
 * Renders a single todo item with toggle, edit, and delete functionality.
 * Supports inline editing when double-clicked and handles all todo operations
 * through the provided todoOperations object. Uses React.memo for performance.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.todo - Todo object
 * @param {number} props.todo.id - Unique todo identifier
 * @param {string} props.todo.title - Todo title text
 * @param {boolean} props.todo.completed - Todo completion status
 * @param {Function} props.dispatch - Reducer dispatch function (legacy)
 * @param {Object} props.todoOperations - Todo operations object from useTodos hook
 * @param {Function} props.todoOperations.toggleTodo - Function to toggle todo completion
 * @param {Function} props.todoOperations.updateTodo - Function to update todo
 * @param {Function} props.todoOperations.deleteTodo - Function to delete todo
 * @returns {JSX.Element} Todo item component
 * 
 * @example
 * <Item todo={todo} dispatch={dispatch} todoOperations={todoOperations} />
 */
export const Item = memo(function Item({ todo, dispatch, todoOperations }) {
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id } = todo;

    /**
     * Handles toggling todo completion status
     */
    const toggleItem = useCallback(() => {
        todoOperations.toggleTodo(id, !completed);
    }, [todoOperations, id, completed]);

    /**
     * Handles deleting the todo item
     */
    const removeItem = useCallback(() => {
        todoOperations.deleteTodo(id);
    }, [todoOperations, id]);

    /**
     * Handles updating the todo title
     * 
     * @param {string} newTitle - New title for the todo
     */
    const updateItem = useCallback((newTitle) => {
        todoOperations.updateTodo(id, { title: newTitle });
    }, [todoOperations, id]);

    /**
     * Enters edit mode for the todo item
     */
    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    }, []);

    /**
     * Exits edit mode without saving changes
     */
    const handleBlur = useCallback(() => {
        setIsWritable(false);
    }, []);

    /**
     * Saves the edited todo title or deletes if empty
     * 
     * @param {string} title - New title for the todo
     */
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
