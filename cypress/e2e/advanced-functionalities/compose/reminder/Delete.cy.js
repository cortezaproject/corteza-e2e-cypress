/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a reminder', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Testing for deleting a reminder', () => {
    it('should be able to delete a reminder', () => {
      cy.intercept('/api/compose/namespace/').as('namespace-list')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@namespace-list')
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-item-reminders"]').click({ force: true })
      cy.get('[data-test-id="button-delete-reminder"] button').click({ force: true })
      cy.get('[data-test-id="button-delete-confirm"]', { timeout: 10000 })
          .click({ force: true })
      cy.get('[data-test-id="span-reminder-title"]').should('not.exist', 'Test reminder')
    })
  })
})
