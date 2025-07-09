import { useCallback } from "react";

/**
 * Sanitizes user input to prevent XSS attacks
 * 
 * @param {string} string - Input string to sanitize
 * @returns {string} Sanitized string with HTML entities escaped
 */
const sanitize = (string) => {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
};

/**
 * Validates that input meets minimum length requirement
 * 
 * @param {string} value - Input value to validate
 * @param {number} min - Minimum required length
 * @returns {boolean} True if value meets minimum length
 */
const hasValidMin = (value, min) => {
    return value.length >= min;
};

/**
 * Reusable input component for todo creation and editing
 * 
 * Provides a text input with keyboard handling for Enter (submit) and blur events.
 * Used for both new todo creation and inline editing of existing todos.
 * Includes input sanitization and minimum length validation.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback function when input is submitted (Enter key)
 * @param {string} [props.placeholder] - Placeholder text for the input
 * @param {string} props.label - Accessible label for the input
 * @param {string} [props.defaultValue] - Default value for the input
 * @param {Function} [props.onBlur] - Optional callback function when input loses focus
 * @returns {JSX.Element} Input component
 * 
 * @example
 * <Input 
 *   onSubmit={handleSubmit} 
 *   placeholder="What needs to be done?" 
 *   label="New Todo Input" 
 * />
 */
export function Input({ onSubmit, placeholder, label, defaultValue, onBlur }) {
    /**
     * Handles input blur events
     */
    const handleBlur = useCallback(() => {
        if (onBlur)
            onBlur();
    }, [onBlur]);

    /**
     * Handles keyboard events, specifically Enter key for submission
     * 
     * @param {KeyboardEvent} e - Keyboard event
     */
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                const value = e.target.value.trim();

                if (!hasValidMin(value, 2))
                    return;

                onSubmit(sanitize(value));
                e.target.value = "";
            }
        },
        [onSubmit]
    );

    return (
        <div className="input-container">
            <input className="new-todo" id="todo-input" type="text" data-testid="text-input" autoFocus placeholder={placeholder} defaultValue={defaultValue} onBlur={handleBlur} onKeyDown={handleKeyDown} />
            <label className="visually-hidden" htmlFor="todo-input">
                {label}
            </label>
        </div>
    );
}
