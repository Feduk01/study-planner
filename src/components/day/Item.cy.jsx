// src/components/day/Item.cy.jsx
import React from 'react';
import { useStore } from '../../data/store';
import Item from './Item';
import { expect } from 'vitest';

describe('<Item />', () => {
  const item = {
    id: 1,
    text: 'Test todo',
    done: false,
    late: false,
  };

  let updateTodoStub;
  let removeTodoStub;

  beforeEach(() => {
    // Skapa stubs för updateTodo och removeTodo
    updateTodoStub = cy.stub();
    removeTodoStub = cy.stub();

    // Ställ in initial state i store med stubbade funktioner
    useStore.setState({
      todos: [item],
      updateTodo: updateTodoStub,
      removeTodo: removeTodoStub,
    });
  });

  //const clickedTodo = useStore.getState().todos.find(todo => todo.id === item.id)
  //expect(clickedTodo.done).should('equal', true)//

  it('renders', () => {
    cy.mount(<Item item={item} />);
    cy.get('.item').should('exist');
  });

  it('toggles edit mode', () => {
    cy.mount(<Item item={item} />);
    cy.get('.cursor[title="Ändra"]').click();
    cy.get('input[type="text"]').should('exist'); 
    cy.get('input[type="text"]').then(input => {
      cy.log('Initial input value: ' + input.val());
    });
    cy.get('input[type="text"]').clear().type('Updated todo');
    cy.get('input[type="text"]').then(input => {
      cy.log('New input value: ' + input.val());
    });
    cy.get('.cursor-save[title="Spara"]').should('exist').click();
    cy.get('label').then((element) => {
      cy.log('Label text after save: ' + element.text());
    });
    cy.log('Store state after save: ' + JSON.stringify(useStore.getState().todos));
    cy.get('label', { timeout: 10000 }).should('contain', 'Updated todo');
  });

  it('toggles todo status', () => {
    cy.mount(<Item item={item} />);
    cy.get('input[type="checkbox"]').check();
    cy.wrap(updateTodoStub).should('have.been.calledWith', {
      ...item,
      done: true,
    });
    cy.get('input[type="checkbox"]').should('be.checked');
  });

  it('removes todo', () => {
    cy.mount(<Item item={item} />);
    cy.get('.cursor[title="Ta bort"]').click();
    cy.wrap(removeTodoStub).should('have.been.calledWith', item.id);
    cy.get(`[data-testid="item-${item.id}"]`).should('not.exist');
  });
});
