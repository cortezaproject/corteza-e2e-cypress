/// <reference types="cypress" />
const oneURL = Cypress.env('ONE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test webpage tour', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: oneURL })
    }
  })

  context('This is a function for testing the webpage tour', () => {
    it('should be able to see the webpage tour', () => {
      cy.get('.modal-footer', { timeout: 10000 }).should('exist')
      cy.contains('Welcome to Corteza').should('exist')
      cy.wait(1000)
      cy.get('.modal-footer > :first-child()').click()
    })
  })
})
