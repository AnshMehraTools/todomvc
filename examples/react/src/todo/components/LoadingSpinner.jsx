import './LoadingSpinner.css';

/**
 * Loading spinner component for indicating API operations in progress
 * 
 * Displays an animated spinner with loading text. Includes proper ARIA
 * attributes for screen reader accessibility.
 * 
 * @component
 * @returns {JSX.Element} Loading spinner component
 * 
 * @example
 * {isLoading && <LoadingSpinner />}
 */
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
