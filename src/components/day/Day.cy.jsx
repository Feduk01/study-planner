import React from 'react';
import Day from './Day';
import { useStore } from '../../data/store';

const mockTodos = [
  { id: 1, text: 'Test todo 1', done: false, late: false },
  { id: 2, text: 'Test todo 2', done: true, late: false },
];

describe('<Day />', () => {
  beforeEach(() => {
    useStore.setState({
      todos: mockTodos,
      addTodo: (newTodo) => {
        const todos = [...useStore.getState().todos, { ...newTodo, id: Date.now() }];
        useStore.setState({ todos });
      },
    });
  });

  it('renders', () => {
    cy.mount(<Day day={mockTodos} dayName="Måndag" />);
    cy.get('.day').should('exist');
    cy.get('h2').should('contain', 'Måndag');
  });

  it('renders items', () => {
    cy.mount(<Day day={mockTodos} dayName="Måndag" />);
    cy.get('.item').should('have.length', mockTodos.length);
  });

  it('adds a new todo item', () => {
    cy.mount(<Day day={mockTodos} dayName="Måndag" />);
    const newTodoText = 'New test todo';
    cy.get('input[placeholder="Ny uppgift"]').type(newTodoText);
    cy.get('button').contains('Lägg till').click();
    cy.get('.item').last().should('contain', newTodoText);
  });
});
