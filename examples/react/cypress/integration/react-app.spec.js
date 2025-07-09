describe('React TodoMVC App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    describe('Initial State', () => {
        it('should display the app title', () => {
            cy.get('h1').should('contain', 'todos');
        });

        it('should have theme toggle button', () => {
            cy.get('.theme-toggle').should('be.visible');
        });

        it('should have new todo input', () => {
            cy.get('.new-todo')
                .should('be.visible')
                .should('have.attr', 'placeholder', 'What needs to be done?');
        });

        it('should load todos from API', () => {
            cy.get('.todo-list li').should('have.length.greaterThan', 0);
        });
    });

    describe('Dark Mode Toggle', () => {
        it('should toggle between light and dark themes', () => {
            cy.get('body').should('not.have.class', 'dark-theme');
            
            cy.get('.theme-toggle').click();
            cy.get('body').should('have.class', 'dark-theme');
            
            cy.get('.theme-toggle').click();
            cy.get('body').should('not.have.class', 'dark-theme');
        });

        it('should persist theme preference', () => {
            cy.get('.theme-toggle').click();
            cy.get('body').should('have.class', 'dark-theme');
            
            cy.reload();
            
            cy.get('body').should('have.class', 'dark-theme');
        });
    });

    describe('Todo Operations', () => {
        it('should add a new todo', () => {
            const newTodo = 'Test todo from Cypress';
            
            cy.get('.new-todo')
                .type(newTodo)
                .type('{enter}');
            
            cy.get('.loading-spinner').should('be.visible');
            
            cy.get('.todo-list')
                .should('contain', newTodo);
        });

        it('should toggle todo completion', () => {
            cy.get('.todo-list li').first().within(() => {
                cy.get('.toggle').click();
            });
            
            cy.get('.loading-spinner').should('be.visible');
            
            cy.get('.loading-spinner').should('not.exist');
        });

        it('should edit todo by double-clicking', () => {
            const updatedText = 'Updated todo text';
            
            cy.get('.todo-list li').first().within(() => {
                cy.get('label').dblclick();
                
                cy.get('.new-todo')
                    .clear()
                    .type(updatedText)
                    .type('{enter}');
            });
            
            cy.get('.loading-spinner').should('be.visible');
            
            cy.get('.todo-list').should('contain', updatedText);
        });

        it('should delete todo', () => {
            cy.get('.todo-list li').then($todos => {
                const initialCount = $todos.length;
                
                cy.get('.todo-list li').first().within(() => {
                    cy.get('.destroy').click({ force: true });
                });
                
                cy.get('.loading-spinner').should('be.visible');
                
                cy.get('.todo-list li').should('have.length', initialCount - 1);
            });
        });

        it('should toggle all todos', () => {
            cy.get('.toggle-all').click();
            
            cy.get('.loading-spinner').should('be.visible');
            
            cy.get('.todo-list li').each($todo => {
                cy.wrap($todo).should('have.class', 'completed');
            });
        });

        it('should clear completed todos', () => {
            cy.get('.todo-list li').first().within(() => {
                cy.get('.toggle').click();
            });
            
            cy.get('.loading-spinner').should('not.exist');
            
            cy.get('.clear-completed').click();
            
            cy.get('.loading-spinner').should('be.visible');
            
            cy.get('.todo-list li.completed').should('not.exist');
        });
    });

    describe('Error Handling', () => {
        it('should display error message when API fails', () => {
            cy.intercept('GET', '**/todos*', { forceNetworkError: true }).as('getTodos');
            
            cy.reload();
            
            cy.get('.error-message').should('be.visible');
            cy.get('.error-text').should('contain', 'Network error');
        });

        it('should allow dismissing error messages', () => {
            cy.intercept('GET', '**/todos*', { forceNetworkError: true }).as('getTodos');
            
            cy.reload();
            
            cy.get('.error-message').should('be.visible');
            
            cy.get('.error-dismiss').click();
            
            cy.get('.error-message').should('not.exist');
        });
    });

    describe('Loading States', () => {
        it('should show loading spinner during API operations', () => {
            cy.intercept('POST', '**/todos', (req) => {
                req.reply((res) => {
                    res.delay(1000);
                    res.send({ fixture: 'new-todo.json' });
                });
            }).as('createTodo');
            
            cy.get('.new-todo')
                .type('Test todo with delay')
                .type('{enter}');
            
            cy.get('.loading-spinner').should('be.visible');
            cy.get('.loading-text').should('contain', 'Loading todos...');
            
            cy.wait('@createTodo');
            
            cy.get('.loading-spinner').should('not.exist');
        });
    });

    describe('Footer Information', () => {
        it('should display correct item count', () => {
            cy.get('.todo-count').should('be.visible');
            cy.get('.todo-count').should('contain.text', /\d+/);
        });

        it('should show filter links', () => {
            cy.get('.filters').within(() => {
                cy.get('a').should('contain', 'All');
                cy.get('a').should('contain', 'Active');
                cy.get('a').should('contain', 'Completed');
            });
        });

        it('should show clear completed button when there are completed todos', () => {
            cy.get('.todo-list li').first().within(() => {
                cy.get('.toggle').click();
            });
            
            cy.get('.loading-spinner').should('not.exist');
            
            cy.get('.clear-completed').should('be.visible');
        });
    });

    describe('Accessibility', () => {
        it('should have proper ARIA labels', () => {
            cy.get('.new-todo').should('have.attr', 'aria-label');
            cy.get('.theme-toggle').should('have.attr', 'aria-label');
            cy.get('.error-dismiss').should('have.attr', 'aria-label');
        });

        it('should support keyboard navigation', () => {
            cy.get('.new-todo')
                .type('Keyboard test todo')
                .type('{enter}');
            
            cy.get('.todo-list').should('contain', 'Keyboard test todo');
            
            cy.get('.todo-list li').first().within(() => {
                cy.get('label').dblclick();
                cy.get('.new-todo').type('{esc}');
            });
        });
    });
});
