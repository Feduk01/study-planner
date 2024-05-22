import React from 'react';
import PrioList from './PrioList';
import { useStore } from '../../data/store';

const mockTodos = [
  { id: 1, text: 'Göra klart inlämning', done: true, late: false },
  { id: 2, text: 'Lektion i skolan 9-16', done: true, late: false },
  { id: 3, text: 'Övning 1', done: false, late: true },
  { id: 4, text: 'Repetera lektionen', done: false, late: false },
  { id: 5, text: 'Öвning 2', done: true, late: false },
  { id: 6, text: 'Distanslektion 9-16', done: false, late: false },
];

describe('<PrioList />', () => {
  beforeEach(() => {
    useStore.setState({ todos: mockTodos });
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
    cy.get('[data-testid="prio-items"] [data-cy="prio-item"]').should('have.length', mockTodos.filter(t => !t.done).length);
  });
});
