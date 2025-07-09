import './ErrorMessage.css';

/**
 * Error message component for displaying API and application errors
 * 
 * Shows error messages with a dismiss button. Includes proper ARIA attributes
 * for accessibility and displays an error icon for visual clarity.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onDismiss - Callback function when error is dismissed
 * @returns {JSX.Element|null} Error message component or null if no message
 * 
 * @example
 * <ErrorMessage 
 *   message="Failed to load todos" 
 *   onDismiss={() => setError(null)} 
 * />
 */
export function ErrorMessage({ message, onDismiss }) {
    if (!message) {
        return null;
    }

    return (
        <div className="error-message-container">
            <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{message}</span>
                <button 
                    className="error-dismiss"
                    onClick={onDismiss}
                    aria-label="Dismiss error"
                >
                    ×
                </button>
            </div>
        </div>
    );
}
