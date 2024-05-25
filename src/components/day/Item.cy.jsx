import React from 'react';
import { useStore } from '../../data/store';
import Item from './Item';

describe('<Item />', () => {
  const item = {
    id: 1,
    text: 'Test todo',
    done: false,
    late: false,
  };


  it('renders', () => {
    cy.mount(<Item item={item} />);
    cy.get('.item').should('exist');
  });

  it('renders checkbox and text', () => {
    cy.mount(<Item item={item} />);
    cy.get('input[type="checkbox"]').should('exist');
    cy.get('label').should('exist').and('contain', 'Test todo');
  });

  
});
