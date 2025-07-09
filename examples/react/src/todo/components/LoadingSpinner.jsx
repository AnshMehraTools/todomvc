import './LoadingSpinner.css';

export function LoadingSpinner() {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner" aria-label="Loading todos...">
                <div className="spinner"></div>
                <span className="loading-text">Loading todos...</span>
            </div>
        </div>
    );
}
