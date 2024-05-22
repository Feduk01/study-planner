import React from 'react';
import Footer from './Footer';

describe('<Footer />', () => {
  it('renders the current date and year', () => {
    cy.mount(<Footer />);
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();
    const formattedDate = `${day}/0${month}/${year}`;
    
    cy.get('footer').within(() => {
      cy.get('p').first().should('contain', formattedDate);
      cy.get('p').last().should('contain', 'Studieguide | 2024');
    });
  });
});