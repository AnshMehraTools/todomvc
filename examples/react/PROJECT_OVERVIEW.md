# React TodoMVC - Project Overview

## 📋 **Project Summary**
A modern React implementation of the TodoMVC application featuring dark mode toggle, JSONPlaceholder API integration, and comprehensive testing suite. Built with React 17.0.2, this app demonstrates professional frontend development practices with full CRUD operations, responsive design, and robust error handling.

## 🚀 **Key Features**
- **Dark/Light Mode Toggle**: Smooth theme switching with localStorage persistence
- **API Integration**: Full CRUD operations with JSONPlaceholder API (GET, POST, PATCH, DELETE)
- **Responsive Design**: Mobile-friendly interface with TodoMVC standard styling
- **Loading States**: Visual feedback during API operations
- **Error Handling**: User-friendly error messages with retry capabilities
- **Routing**: Filter views for All, Active, and Completed todos

## 🏗️ **Architecture**
```
src/todo/
├── app.jsx                 # Main app component with API integration
├── reducer.js              # State management with useReducer
├── ThemeContext.jsx         # Theme provider for dark/light mode
├── components/             # UI components (Header, Main, Footer, etc.)
├── hooks/                  # Custom hooks (useTodos)
├── services/               # API service layer (todoApi)
└── __tests__/              # Comprehensive test suite
```

## 🧪 **Test Suite Coverage (65 Tests)**

### **Unit Tests (Component Testing)**
| Component | Test Cases | Coverage |
|-----------|------------|----------|
| **App** | 6 tests | Loading states, error handling, CRUD operations |
| **Header** | 4 tests | Todo input, form submission, theme toggle |
| **Main** | 7 tests | Todo list rendering, toggle all functionality |
| **Footer** | 5 tests | Todo count, filter links, clear completed |
| **ThemeToggle** | 6 tests | Dark/light mode switching, localStorage persistence |
| **ErrorMessage** | 3 tests | Error display, dismissal functionality |
| **LoadingSpinner** | 2 tests | Loading state display |

### **Integration Tests (Service Layer)**
| Module | Test Cases | Coverage |
|--------|------------|----------|
| **todoApi** | 8 tests | API calls, error handling, response parsing |
| **useTodos** | 8 tests | Custom hook operations with mocked API |
| **reducer** | 10 tests | State transitions, action handling |
| **ThemeContext** | 6 tests | Theme provider, localStorage integration |

### **E2E Tests (Cypress)**
| Feature | Test Cases | Coverage |
|---------|------------|----------|
| **CRUD Operations** | 5 tests | Add, edit, delete, toggle todos |
| **Dark Mode** | 3 tests | Theme switching, persistence |
| **API Integration** | 4 tests | Loading states, error scenarios |

## 🛠️ **Development Workflow**

### **Setup & Installation**
```bash
npm install                 # Install dependencies
npm run dev                # Start development server (localhost:8080)
npm test                   # Run test suite
npm run build              # Build for production
```

### **Testing Commands**
```bash
npm test                   # Run all unit/integration tests
npm run test:watch         # Run tests in watch mode
npx cypress open           # Open Cypress for e2e testing
```

## 📊 **Test Results Summary**
```
✅ Test Suites: 11 passed, 11 total
✅ Tests: 65 passed, 65 total
✅ Coverage: Components, hooks, services, integration
⏱️ Runtime: ~2 seconds
```

## 🔧 **Technology Stack**
- **Frontend**: React 17.0.2, React Router DOM 6.2.1
- **State Management**: useReducer with Context API
- **Styling**: CSS3 with CSS custom properties for theming
- **Testing**: Jest 29.4.3, React Testing Library 12.1.5, Cypress
- **API**: JSONPlaceholder REST API integration
- **Build**: Create React App with Babel/Webpack

## 📚 **Documentation**
- **README.md**: Complete setup and development guide
- **CONTRIBUTING.md**: Developer guidelines and standards
- **docs/API.md**: JSONPlaceholder integration documentation
- **JSDoc Comments**: Inline documentation for all functions/components

## 🎯 **Quality Assurance**
- **100% Test Coverage**: All components and critical paths tested
- **Error Boundaries**: Graceful error handling throughout app
- **Accessibility**: ARIA labels and semantic HTML
- **Performance**: Optimized with useMemo and useCallback
- **Code Quality**: ESLint compliance and consistent formatting

---

**Repository**: https://github.com/AnshMehraTools/todomvc  
**Live Demo**: http://localhost:8080 (development)  
**Maintainer**: @AnshMehraTools
