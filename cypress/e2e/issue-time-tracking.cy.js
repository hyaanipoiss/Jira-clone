describe('Functionality of Time-tracking', () => {
    const selectors = {
      issueDetailsModal: '[data-testid="modal:issue-details"]',
      timeLoggingButton: '[data-testid="icon:stopwatch"]',
      trackingModal: '[data-testid="modal:tracking"]',
      numberInput: 'input[placeholder="Number"]',
    };
  
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task').click();
        cy.get(selectors.issueDetailsModal).should('be.visible');
      });
    });
  
    it('Time Estimation Functionality', () => {
      const value = "10";
      const newValue = "20";
  
      cy.get(selectors.issueDetailsModal).within(() => {
        cy.get(selectors.numberInput).clear().type(value);
        cy.contains(`${value}h estimated`).should('be.visible');
  
        cy.get(selectors.numberInput).clear().type(newValue);
        cy.contains(`${newValue}h estimated`).should('be.visible');
  
        cy.get(selectors.numberInput).clear();
        cy.contains(`${newValue}h estimated`).should('not.exist');
      });
    });
  
    it('Time logging functionality', () => {
      const timeSpent = '2';
      const timeRemaining = '5';
  
      cy.get(selectors.timeLoggingButton).click();
      cy.get(selectors.trackingModal).should('be.visible').within(() => {
        cy.get(selectors.numberInput).first().clear().type(timeSpent);
        cy.get(selectors.numberInput).last().clear().type(timeRemaining);
      });
  
      cy.get(selectors.trackingModal).contains('button', 'Done').click();
      cy.get(selectors.issueDetailsModal).should('be.visible');
      cy.contains(`${timeSpent}h logged`).should('be.visible');
      cy.contains(`${timeRemaining}h remaining`).should('be.visible');
  
      cy.get(selectors.timeLoggingButton).click();
      cy.get(selectors.trackingModal).should('be.visible').within(() => {
        cy.get(selectors.numberInput).first().clear();
        cy.get(selectors.numberInput).last().clear();
      });
  
      cy.get(selectors.trackingModal).contains('button', 'Done').click();
      cy.get(selectors.issueDetailsModal).should('be.visible');
      cy.contains("No time logged").should('be.visible');
    });
  });