describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
          .trigger('mouseover')
          .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
    });
  });

  // Task 1.
  it('Should test "Priority" dropdown', () => {
    const expectedLength = 5;
    const priorityValues = [];
    
    cy.get('div[data-testid="select:priority"] div div')
    .invoke('text')
    .then(textContent => {
      priorityValues.push(textContent);
      cy.log(JSON.stringify(priorityValues));      
      cy.get('div[data-testid="select:priority"] div div')
        .click()
        .then(() => {            
            cy.get('div[data-select-option-value]').then((parent) => {          
              cy.wrap(parent).find('div').each((child) => {
                const tekst = Cypress.$(child).text();
                if (!priorityValues.includes(tekst)) {
                  priorityValues.push(tekst);
                  cy.log(JSON.stringify(priorityValues));
                }
              });
              cy.wrap(priorityValues).should('have.length', expectedLength);
            });
        });
      });
  });

  // Task 2
  it('Should test characters in reporter\'s name', () => {
    cy.get('div[data-testid="select:reporter"]')
    .invoke('text')
    .then(textContent => {
      cy.log(textContent);

      const onlyLettersAndSpaces = /^[A-Za-z\s]+$/.test(textContent);
      const onlyLetters = /^[A-Za-z]+$/.test(textContent);

      expect(onlyLettersAndSpaces).to.be.true;
      expect(onlyLetters).to.be.true;
    });
  });
});

function getIssueDetailsModal() {
  return cy.get('[data-testid="modal:issue-details"]');
}