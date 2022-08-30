/// <reference types="cypress" />
const oneURL = Cypress.env('webappLink').oneURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Testing whether the app is listed in webapp one and enabled', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: oneURL })
    }
  })

  context('Testing whether the app is listed in webapp one and enabled', () => {
    it('should be listed and enabled', () => {
      cy.visit(oneURL)
      // Here we close the start tour pop up
      if (!window.sessionStorage.getItem('auth.refresh-token')) {
        cy.get('.modal-header > :last-child()').click()
      }
      cy.get('[data-test-id="input-search"]').type('Testing application')
      cy.get('[data-test-id="Testing application"]').click({ force: true })
      cy.url().should('be.equal', 'https://www.google.com/')
    })
  })
})
