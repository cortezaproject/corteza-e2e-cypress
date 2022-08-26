/// <reference types="cypress" />
const composeURL = Cypress.env('webappLink').composeURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for deleting a reminder', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: composeURL })
    }
  })

  context('Testing for deleting a reminder', () => {
    it('should be able to delete a reminder', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-item-reminders"]').click()
      cy.get('[data-test-id="button-delete-reminder"]').click()
      cy.get('[data-test-id="span-reminder-title"]').should('not.exist', 'Test reminder')
    })
  })
})
