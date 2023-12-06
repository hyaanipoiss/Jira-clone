describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

        it('Should add, edit and delete a comment', () => {
      
          // Add comment
          const initialComment = 'Initial comment';
          getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...').click();
            cy.get('textarea').type(initialComment);  
            cy.contains('Save').click();
          });
          cy.get('[data-testid="issue-comment"]').should('contain', initialComment);
      
          // Edit comment
          const editedComment = 'Edited comment';
          getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]').contains('Edit').click();
            cy.get('textarea').clear().type(editedComment);
            cy.contains('Save').click(); 
          });
          cy.get('[data-testid="issue-comment"]').should('contain', editedComment);
      
          // Delete comment
          getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]').contains('Delete').click();
            cy.contains('Delete comment').click();
          });
          cy.get('[data-testid="issue-comment"]').should('not.exist');
      
        });
      
      });
      