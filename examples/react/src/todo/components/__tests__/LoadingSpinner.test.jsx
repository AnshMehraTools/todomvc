import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
    test('renders loading spinner', () => {
        render(<LoadingSpinner />);
        
        expect(screen.getByText('Loading todos...')).toBeInTheDocument();
    });

    test('has correct aria-label for accessibility', () => {
        render(<LoadingSpinner />);
        
        expect(screen.getByLabelText('Loading todos...')).toBeInTheDocument();
    });

    test('renders spinner element', () => {
        const { container } = render(<LoadingSpinner />);
        
        expect(container.querySelector('.spinner')).toBeInTheDocument();
    });
});
