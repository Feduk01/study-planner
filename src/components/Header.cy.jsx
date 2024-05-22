import React from 'react';
import Header from './Header';

describe('<Header />', () => {
  it('renders', () => {
    cy.mount(<Header />);
    cy.get('header').should('exist');
  });

  it('displays the correct title', () => {
    cy.mount(<Header />);
    cy.get('h1').should('contain', 'Min vecka');
  });

  it('displays the restart button', () => {
    cy.mount(<Header />);
    cy.get('button.restart-week').should('exist').and('contain', 'Starta om vecka');
  });
});