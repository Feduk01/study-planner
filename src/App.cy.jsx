import React from 'react'
import App from './App'

describe('<App />', () => {
  it('renders', () => {
    cy.mount(<App />)
    cy.get('.column').should('exist')
  })

  it('renders Header component', () => {
    cy.mount(<App />)
    cy.get('header').should('exist')
    cy.get('header h1').should('contain', 'Min vecka') 
  })

  it('renders Main component', () => {
    cy.mount(<App />)
    cy.get('main').should('exist')
    cy.get('main .day-view').should('exist') 
  })

  it('renders Footer component', () => {
    cy.mount(<App />)
    cy.get('footer').should('exist')
    cy.get('footer p').should('contain', 'Studieguide | 2024')
  })
})
