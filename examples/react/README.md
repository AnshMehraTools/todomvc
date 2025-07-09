# React TodoMVC with API Integration and Dark Mode

A modern implementation of the TodoMVC application built with React, featuring JSONPlaceholder API integration, dark mode theming, and comprehensive testing.

## Features

- ✅ **Complete TodoMVC functionality** - Add, edit, delete, and toggle todos
- 🌐 **API Integration** - Persistent storage using JSONPlaceholder API
- 🌙 **Dark Mode** - Beautiful light/dark theme toggle with smooth animations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Real-time Updates** - Loading states and error handling for all operations
- 🧪 **Comprehensive Testing** - Unit, integration, and e2e test coverage
- ♿ **Accessibility** - ARIA labels and keyboard navigation support

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AnshMehraTools/todomvc.git
cd todomvc/examples/react
```

2. Install dependencies:
```bash
npm install
```

## Development

### Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Run tests:
```bash
# Run unit and integration tests
npm test

# Run tests in watch mode
npm run test:watch

# Run e2e tests with Cypress
npm run cypress:open
```

### Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── todo/
│   ├── components/          # React components
│   │   ├── __tests__/      # Component unit tests
│   │   ├── header.jsx      # App header with title and input
│   │   ├── main.jsx        # Main todo list section
│   │   ├── footer.jsx      # Footer with filters and count
│   │   ├── item.jsx        # Individual todo item
│   │   ├── input.jsx       # Reusable input component
│   │   ├── ThemeToggle.jsx # Dark mode toggle button
│   │   ├── ErrorMessage.jsx # Error display component
│   │   └── LoadingSpinner.jsx # Loading indicator
│   ├── services/           # API service layer
│   │   ├── __tests__/      # Service tests
│   │   └── todoApi.js      # JSONPlaceholder API integration
│   ├── hooks/              # Custom React hooks
│   │   ├── __tests__/      # Hook tests
│   │   └── useTodos.js     # Todo operations hook
│   ├── __tests__/          # Core logic tests
│   ├── app.jsx             # Main app component
│   ├── reducer.js          # State management reducer
│   ├── constants.js        # Action type constants
│   ├── ThemeContext.jsx    # Theme provider and context
│   └── app.css             # Application styles
├── test/                   # Test configuration
└── index.js                # Application entry point
```

## API Integration

This application integrates with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) for persistent todo storage. All CRUD operations are supported:

### Endpoints Used

- `GET /todos?userId=1` - Fetch all todos
- `POST /todos` - Create new todo
- `PATCH /todos/:id` - Update existing todo
- `DELETE /todos/:id` - Delete todo

### Error Handling

The application includes comprehensive error handling for:
- Network connectivity issues
- API server errors
- Invalid responses
- Timeout scenarios

All errors are displayed to users with clear, actionable messages and can be dismissed.

### Loading States

Loading indicators are shown during all API operations to provide immediate user feedback.

## Dark Mode

The application features a beautiful dark mode implementation with:
- Smooth CSS transitions between themes
- Persistent theme preference in localStorage
- Automatic theme detection based on system preferences
- Accessible theme toggle button with proper ARIA labels

## Testing

### Unit Tests
- Component rendering and interaction tests using React Testing Library
- API service layer tests with mocked fetch calls
- Custom hook tests with proper mocking
- State reducer tests covering all action types

### Integration Tests
- End-to-end API integration testing
- Theme context and localStorage persistence
- Error handling and loading state management

### E2E Tests
- Complete user workflows using Cypress
- Cross-browser compatibility testing
- Accessibility testing with axe-core

### Running Tests

```bash
# Run all unit and integration tests
npm test

# Run tests in watch mode for development
npm run test:watch

# Run e2e tests
npm run cypress:open

# Run tests with coverage report
npm run test:coverage
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Guidelines

1. **Code Style**: Follow the existing code style and use ESLint/Prettier
2. **Testing**: Write tests for new features and ensure all tests pass
3. **Documentation**: Update JSDoc comments and README as needed
4. **Accessibility**: Ensure all UI changes maintain accessibility standards

## Architecture

### State Management
The application uses React's `useReducer` hook for state management, providing predictable state updates and easy testing.

### API Layer
A dedicated service layer (`todoApi.js`) handles all API communications with proper error handling and response validation.

### Theme System
CSS custom properties enable smooth theme transitions, with React Context managing theme state and localStorage persistence.

### Component Structure
Components follow a clear hierarchy with proper separation of concerns:
- Presentational components handle UI rendering
- Container components manage state and business logic
- Custom hooks encapsulate reusable logic

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the original TodoMVC license for details.

## Acknowledgments

- Original TodoMVC implementation by [petehunt](https://github.com/petehunt)
- Enhanced with API integration and modern React patterns
- Dark mode and accessibility improvements
- Comprehensive testing suite
