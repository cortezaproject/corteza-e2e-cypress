/// <reference types="cypress" />
const oneURL = Cypress.env('ONE_URL')

describe('Testing the enable on application list functionality', () => {
  context('Test for checking if application is enabled', () => {
    it('should be enabled', () => {
      cy.visit(oneURL + '/')
      // Here we close the start tour pop up
      cy.get('.modal-header > :last-child()', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="input-search"]').type('Cypress', { force: true })
      cy.get('.card-text').contains('Cypress namespace').click({ force: true })
      cy.url().should('exist', oneURL + '/compose/ns/cypress_namespace/pages')
    })
  })
})
