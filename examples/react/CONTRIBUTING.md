# Contributing to React TodoMVC

Thank you for your interest in contributing to the React TodoMVC application! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

This project adheres to a code of conduct that promotes a welcoming and inclusive environment. Please be respectful and professional in all interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Git for version control
- A code editor (VS Code recommended)

### Initial Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/todomvc.git
   cd todomvc/examples/react
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Run tests to ensure everything works:
   ```bash
   npm test
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names following this pattern:
- `feature/description` - For new features
- `fix/description` - For bug fixes
- `docs/description` - For documentation updates
- `test/description` - For test improvements

Examples:
- `feature/add-todo-categories`
- `fix/dark-mode-toggle-bug`
- `docs/update-api-documentation`

### Commit Messages

Write clear, descriptive commit messages:

```
type(scope): brief description

Longer description if needed, explaining what and why.

- List specific changes
- Reference issues: Fixes #123
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Development Process

1. **Create a branch** from `master` for your changes
2. **Make your changes** following the code style guidelines
3. **Write tests** for new functionality
4. **Update documentation** as needed
5. **Test your changes** thoroughly
6. **Submit a pull request** with a clear description

## Code Style Guidelines

### JavaScript/React Standards

#### General Principles
- Use functional components with hooks
- Prefer `const` over `let`, avoid `var`
- Use descriptive variable and function names
- Keep functions small and focused
- Follow the existing code patterns

#### React Specific
```javascript
// ✅ Good: Functional component with hooks
export function TodoItem({ todo, onToggle, onDelete }) {
    const [editing, setEditing] = useState(false);
    
    const handleToggle = useCallback(() => {
        onToggle(todo.id);
    }, [todo.id, onToggle]);
    
    return (
        <li className={todo.completed ? 'completed' : ''}>
            {/* Component JSX */}
        </li>
    );
}

// ❌ Avoid: Class components (unless necessary)
class TodoItem extends Component {
    // Avoid for new code
}
```

#### Hooks Usage
```javascript
// ✅ Good: Custom hooks for reusable logic
const useTodos = (dispatch) => {
    const addTodo = useCallback(async (title) => {
        // Implementation
    }, [dispatch]);
    
    return { addTodo };
};

// ✅ Good: useCallback for event handlers
const handleClick = useCallback((event) => {
    // Handle click
}, [dependency]);
```

#### File Organization
```
src/
├── todo/
│   ├── components/          # React components
│   │   ├── __tests__/      # Component tests
│   │   └── ComponentName.jsx
│   ├── hooks/              # Custom hooks
│   │   ├── __tests__/      # Hook tests
│   │   └── useHookName.js
│   ├── services/           # API and external services
│   │   ├── __tests__/      # Service tests
│   │   └── serviceName.js
│   └── utils/              # Utility functions
```

### CSS Guidelines

#### CSS Custom Properties
```css
/* ✅ Good: Use CSS custom properties for theming */
:root {
    --primary-color: #007bff;
    --text-color: #333;
    --bg-color: #fff;
}

.dark-theme {
    --text-color: #fff;
    --bg-color: #333;
}

.component {
    color: var(--text-color);
    background: var(--bg-color);
}
```

#### BEM Methodology
```css
/* ✅ Good: BEM naming convention */
.todo-item {
    /* Block */
}

.todo-item__title {
    /* Element */
}

.todo-item--completed {
    /* Modifier */
}
```

## Testing Requirements

### Test Coverage

All new code must include appropriate tests:

- **Unit Tests**: For individual functions and components
- **Integration Tests**: For component interactions and API calls
- **E2E Tests**: For complete user workflows

### Testing Standards

#### Component Testing
```javascript
// ✅ Good: Comprehensive component test
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../TodoItem';

describe('TodoItem', () => {
    const mockTodo = {
        id: 1,
        title: 'Test todo',
        completed: false
    };
    
    test('renders todo title', () => {
        render(<TodoItem todo={mockTodo} onToggle={jest.fn()} />);
        expect(screen.getByText('Test todo')).toBeInTheDocument();
    });
    
    test('calls onToggle when checkbox is clicked', () => {
        const mockOnToggle = jest.fn();
        render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} />);
        
        fireEvent.click(screen.getByRole('checkbox'));
        expect(mockOnToggle).toHaveBeenCalledWith(1);
    });
});
```

#### API Testing
```javascript
// ✅ Good: API service test with mocking
import { todoApi } from '../todoApi';

global.fetch = jest.fn();

describe('todoApi', () => {
    beforeEach(() => {
        fetch.mockClear();
    });
    
    test('fetchTodos returns todo list', async () => {
        const mockTodos = [{ id: 1, title: 'Test', completed: false }];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos
        });
        
        const result = await todoApi.fetchTodos();
        expect(result).toEqual(mockTodos);
    });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run cypress:open
```

## Documentation Standards

### JSDoc Comments

All functions and components must include JSDoc documentation:

```javascript
/**
 * Custom hook for managing todo operations with API integration
 * 
 * Provides a complete set of todo operations including CRUD operations,
 * error handling, and loading state management.
 * 
 * @param {Function} dispatch - Reducer dispatch function for state updates
 * @returns {Object} Object containing all todo operation functions
 * 
 * @example
 * const todoOperations = useTodos(dispatch);
 * await todoOperations.addTodo('New todo item');
 */
export const useTodos = (dispatch) => {
    // Implementation
};
```

### Component Documentation

```javascript
/**
 * Individual todo item component with editing capabilities
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.todo - Todo object
 * @param {number} props.todo.id - Unique todo identifier
 * @param {string} props.todo.title - Todo title text
 * @param {boolean} props.todo.completed - Todo completion status
 * @returns {JSX.Element} Todo item component
 * 
 * @example
 * <TodoItem todo={todo} onToggle={handleToggle} />
 */
export function TodoItem({ todo, onToggle }) {
    // Implementation
}
```

### README Updates

When adding new features, update the README.md to include:
- Feature description
- Usage instructions
- Configuration options
- Examples

## Pull Request Process

### Before Submitting

1. **Run all tests**: Ensure all tests pass
   ```bash
   npm test
   npm run cypress:run
   ```

2. **Check code style**: Run linting
   ```bash
   npm run lint
   ```

3. **Update documentation**: Include relevant documentation updates

4. **Test manually**: Verify your changes work in the browser

### PR Description Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows the style guidelines
- [ ] Self-review of code completed
- [ ] Code is commented, particularly in hard-to-understand areas
- [ ] Corresponding changes to documentation made
- [ ] No new warnings introduced
- [ ] All tests pass locally
```

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: Maintainers review code for quality and standards
3. **Testing**: Changes are tested in various environments
4. **Approval**: At least one maintainer approval required
5. **Merge**: Changes are merged into the main branch

## Issue Reporting

### Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, Node.js version
6. **Screenshots**: If applicable

### Feature Requests

For new features, include:

1. **Problem Statement**: What problem does this solve?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Other solutions considered
4. **Use Cases**: When would this be used?

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed

## Development Environment

### Recommended Tools

- **VS Code**: With React and JavaScript extensions
- **React Developer Tools**: Browser extension for debugging
- **Git**: For version control
- **Node.js**: Runtime environment

### VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

### Environment Variables

Create a `.env.local` file for local development:

```
REACT_APP_API_BASE=https://jsonplaceholder.typicode.com
REACT_APP_DEBUG=true
```

## Getting Help

### Resources

- **Documentation**: Check the README and API docs first
- **Issues**: Search existing issues for similar problems
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Ask for feedback on draft PRs

### Communication

- Be specific about the problem or question
- Include relevant code snippets or error messages
- Mention the environment and steps taken
- Be patient and respectful

Thank you for contributing to React TodoMVC! Your efforts help make this project better for everyone.
