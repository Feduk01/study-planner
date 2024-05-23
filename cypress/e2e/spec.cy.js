//Test based on user stories

describe('Todo Application - Item Component', () => {
  // Som en student vill jag kunna ändra texten för en todo item, så att jag kan uppdatera den om något nytt händer.
  it('should edit a todo item and verify the update', () => {
    cy.visit('/');
    cy.get('.cursor[title="Ändra"]').first().click();
    // cy.get('input[type="text"]').should('exist');
    cy.get('input[type="text"]').first().clear().type('Updated todo');
    cy.get('.cursor-save[title="Spara"]').first().click();
    cy.get('label').first().should('contain', 'Updated todo');
  });

// Som en student vill jag kunna ta bort en todo item, eftersom saker kan ändras.
  it('should remove a todo item', () => {
    cy.visit('/');
    cy.get('.item').should('have.length.greaterThan', 0);
    cy.get('.item').first().invoke('attr', 'data-testid').then((todoId) => {
      cy.get(`.item[data-testid="${todoId}"] .cursor[title="Ta bort"]`).click();
      cy.get(`.item[data-testid="${todoId}"]`).should('not.exist');
    });
  });

  it('should toggle todo status', () => {
    cy.visit('/');
    cy.get('.item').first().within(() => {
      cy.get('input[type="checkbox"]').should('exist').and('be.checked');
      cy.get('input[type="checkbox"]').uncheck();
      cy.get('input[type="checkbox"]').should('not.be.checked');
    });
  });
});


describe('Todo Application - Main Component', () => {
  // Som en student vill jag att veckans alla dagar ska visas, så att jag kan välja fritt när jag vill göra mina uppgifter.
  it('should render all days of the week', () => {
    cy.visit('/');
    const dayNames = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"]
    dayNames.forEach(day => {
      cy.contains(day).should('exist');
    });
  });
}); 

describe('Todo Application - PrioList Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

// Som en student vill jag kunna söka efter todo items som innehåller en viss text, så att jag lätt kan se om en viss sak finns med i priolistan.
  it('should filter todo items based on search input', () => {
    const searchText = 'Övning';
    cy.get('[data-testid="prio-items"]').should('exist');
    cy.get('[data-testid="prio-items"] [data-cy="prio-item"]').should('have.length.greaterThan', 0);
    cy.get('[data-testid="search-input"]').type(searchText);
    cy.get('[data-testid="prio-items"] [data-cy="prio-item"]').each(($item) => {
      cy.log($item.text()); 
      cy.wrap($item).should('contain', searchText);
    });
  });
});

describe('Todo Application - Day Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // Lägga till en ny todo (gick inte att testa i komponent test)
  it('adds a new todo item', () => {
    const newTodoText = 'New test todo';
    cy.contains('Måndag').should('exist');
    cy.get('input[placeholder="Ny uppgift"]').first().type(newTodoText);
    cy.get('button').contains('Lägg till').click();
    cy.get('.day').first().within(() => {
    cy.get('.item').last().should('contain', newTodoText);
    });
  });
});

