import React from 'react';
import Main from './Main';
import { useStore } from '../data/store';
import { todos } from '../data/data';
import { dayNames } from '../data/data';
import { splitTodosIntoDays } from '../utils/list';

describe('<Main />', () => {
  beforeEach(() => {
    useStore.setState({
      todos: todos,
    });
  });

  it('renders', () => {
    cy.mount(<Main />);
    cy.get('main').should('exist');
  });

  it('renders all days of the week', () => {
    cy.mount(<Main />);
    const days = splitTodosIntoDays(todos);
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
