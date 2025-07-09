import './ErrorMessage.css';

export function ErrorMessage({ message, onDismiss }) {
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
