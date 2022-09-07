/// <reference types="cypress" />
const oneURL = Cypress.env('ONE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing the enable on application list functionality', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: oneURL })
    }
  })

  context('Test for checking if application is enabled', () => {
    it('should be enabled', () => {
      cy.visit(oneURL)
      // Here we close the start tour pop up
      if (!window.sessionStorage.getItem('auth.refresh-token')) {
        cy.get('.modal-header > :last-child()').click()
      }
      cy.get('[data-test-id="input-search"]').type('Cypress', { force: true })
      cy.get('.overflow-auto').contains('Cypress namespace').click({ force: true })
      cy.url().should('exist', oneURL + '/compose/ns/cypress_namespace/pages')
    })
  })
})
