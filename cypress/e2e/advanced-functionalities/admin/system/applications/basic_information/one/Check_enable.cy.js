/// <reference types="cypress" />
const oneURL = Cypress.env('ONE_URL')

describe('Testing whether the app is listed in webapp one and enabled', () => {
  context('Testing whether the app is listed in webapp one and enabled', () => {
    it('should be listed and enabled', () => {
      cy.visit(oneURL + '/')
      cy.get('[data-test-id="input-search"]').type('Testing application', { force: true })
      cy.get('[data-test-id="Testing application"]').click({ force: true })
      cy.url().should('be.equal', 'https://www.google.com/')
    })
  })
})
