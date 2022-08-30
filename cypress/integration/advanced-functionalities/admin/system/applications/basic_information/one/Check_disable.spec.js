/// <reference types="cypress" />
const oneURL = Cypress.env('webappLink').oneURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Testing whether the app is disabled in webapp one', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: oneURL })
    }
  })

  context('Testing whether the app is disabled in webapp one', () => {
    it('should be disabled', () => {
      cy.visit(oneURL)
      // Here we close the start tour pop up
      if (!window.sessionStorage.getItem('auth.refresh-token')) {
        cy.get('.modal-header > :last-child()').click()
      }
      cy.get('[data-test-id="input-search"]').type('Testing application', { force: true })
      cy.get('[data-test-id="Testing application"]').click({ force: true })
      cy.url().should('not.be.equal', 'https://www.google.com/')
    })
  })
})
