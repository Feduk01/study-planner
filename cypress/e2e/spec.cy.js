// cypress/e2e/todo.cy.js
describe('Todo Application', () => {
  it('should edit a todo item and verify the update', () => {
    cy.visit('/');
    cy.get('.cursor[title="Ändra"]').first().click();
    cy.get('input[type="text"]').should('exist');
    cy.get('input[type="text"]').first().clear().type('Updated todo');
    cy.get('.cursor-save[title="Spara"]').first().click();
    cy.get('label').first().should('contain', 'Updated todo');
  });

  it('should toggle the todo status', () => {
    cy.visit('/');
    cy.get('input[type="checkbox"]').first().check();
    cy.get('input[type="checkbox"]').first().should('be.checked');
    cy.get('input[type="checkbox"]').first().uncheck();
    cy.get('input[type="checkbox"]').first().should('not.be.checked');
  });

  it('should remove a todo item', () => {
    cy.visit('/');
    cy.get('.item').should('have.length.greaterThan', 0);

    // Hämta id för den första todo-uppgiften
    cy.get('.item').first().invoke('attr', 'data-testid').then((todoId) => {
      // Klicka på borttagningsknappen för den första todo-uppgiften
      cy.get(`.item[data-testid="${todoId}"] .cursor[title="Ta bort"]`).click();

      // Verifiera att todo-uppgiften är borttagen
      cy.get(`.item[data-testid="${todoId}"]`, { timeout: 10000 }).should('not.exist');
    });
  });
});
