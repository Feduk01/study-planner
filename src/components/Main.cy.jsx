import React from 'react';
import Main from './Main';
import { useStore } from '../data/store';
import { dayNames } from '../data/data';
import { splitTodosIntoDays } from '../utils/list';

const mockTodos = [
  { id: 1, text: 'Task 1', done: false, late: false, day: 'må' },
  { id: 2, text: 'Task 2', done: true, late: false, day: 'ti' },
  { id: 3, text: 'Task 3', done: false, late: true, day: 'on' },
];

describe('<Main />', () => {
  beforeEach(() => {
    useStore.setState({
      todos: mockTodos,
    });
  });

  it('renders', () => {
    cy.mount(<Main />);
    cy.get('main').should('exist');
  });

  it('renders all days of the week', () => {
    cy.mount(<Main />);
    const days = splitTodosIntoDays(mockTodos);
    days.forEach((day, index) => {
      cy.get('.day-view').within(() => {
        cy.contains(dayNames[index]).should('exist');
      });
    });
  });

  it('renders PrioList', () => {
    cy.mount(<Main />);
    cy.get('.prio-list').should('exist');
  });
});
