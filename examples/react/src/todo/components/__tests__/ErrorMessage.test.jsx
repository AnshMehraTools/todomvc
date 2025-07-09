import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
    const mockOnDismiss = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders error message', () => {
        render(<ErrorMessage message="Test error message" onDismiss={mockOnDismiss} />);
        
        expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    test('renders dismiss button', () => {
        render(<ErrorMessage message="Test error" onDismiss={mockOnDismiss} />);
        
        expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
    });

    test('calls onDismiss when dismiss button is clicked', async () => {
        const user = userEvent.setup();
        
        render(<ErrorMessage message="Test error" onDismiss={mockOnDismiss} />);
        
        const dismissButton = screen.getByRole('button', { name: /dismiss/i });
        await user.click(dismissButton);
        
        expect(mockOnDismiss).toHaveBeenCalled();
    });

    test('does not render when message is empty', () => {
        const { container } = render(<ErrorMessage message="" onDismiss={mockOnDismiss} />);
        
        expect(container.firstChild).toBeNull();
    });

    test('does not render when message is null', () => {
        const { container } = render(<ErrorMessage message={null} onDismiss={mockOnDismiss} />);
        
        expect(container.firstChild).toBeNull();
    });
});
