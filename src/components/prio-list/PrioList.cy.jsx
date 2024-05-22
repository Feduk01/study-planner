import React from 'react'
import PrioList from './PrioList'

describe('<PrioList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PrioList />)
  })
})