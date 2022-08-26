/// <reference types="cypress" />
const composeURL = Cypress.env('webappLink').composeURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for creating a reminder', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: composeURL })
    }
  })

  context('Test for creating a reminder', () => {
    it('should be able to create a reminder and snooze it', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-item-reminders"]').click()
      cy.get('[data-test-id="button-add-reminder"]').click()
      cy.get('[data-test-id="input-title"]').type('Test reminder')
      cy.get('[data-test-id="textarea-notes"]').type('This is a test reminder.')
      cy.get('[data-test-id="select-remind-at"]').select('1min')
      cy.get('[data-test-id="button-save"]').click()
      cy.get('[data-test-id="span-reminder-title"]').should('exist', 'Test reminder')
      // We wait 1m in order the reminder to show up
      cy.wait(61000)
      cy.get('.toast-body').should('exist', 'This is a test reminder.')
      cy.get('.custom-select').select('5min')
      // We wait 5m in order the snooze to show up
      cy.wait(301000)
      cy.get('.toast-body').should('exist', 'This is a test reminder.')
      // Clicking on Dismiss button
      cy.get('.card-body > button').click()
      cy.get('[data-test-id="checkbox-dismiss-reminder"]').should('be.checked')
    })
  })
})
