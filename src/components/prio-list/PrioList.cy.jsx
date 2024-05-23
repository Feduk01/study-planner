import React from 'react';
import PrioList from './PrioList';
import { useStore } from '../../data/store';
import { todos } from '../../data/data';


describe('<PrioList />', () => {
  beforeEach(() => {
    useStore.setState({ todos: todos });
  });

  it('renders', () => {
    cy.mount(<PrioList />);
    cy.get('.prio-list').should('exist');
    cy.get('h2').should('contain', 'Vad ska jag göra nu?');
  });

  it('filters todo items based on search input', () => {
    cy.mount(<PrioList />);
    const searchText = 'Övning';
    cy.get('[data-testid="search-input"]').type(searchText);
    cy.get('[data-testid="prio-items"] [data-cy="prio-item"]').each(($item) => {
      cy.wrap($item).should('contain', searchText);
    });
  });

  it('clears the search input and shows all todo items', () => {
    cy.mount(<PrioList />);
    const searchText = 'Övning';
    cy.get('[data-testid="search-input"]').type(searchText);
    cy.get('[data-testid="prio-items"] [data-cy="prio-item"]').should('have.length', 1);
    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="prio-items"] [data-cy="prio-item"]').should('have.length', todos.filter(t => !t.done).length);
  });
});
