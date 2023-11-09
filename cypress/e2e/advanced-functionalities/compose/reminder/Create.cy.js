/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a reminder', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for creating a reminder', () => {
    it('should be able to create a reminder and snooze it', () => {
      cy.intercept('/api/compose/namespace/').as('namespace-list')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@namespace-list')
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-item-reminders"]').click({ force: true })
      cy.get('[data-test-id="button-add-reminder"]').click()
      cy.get('[data-test-id="input-title"]').type('Test reminder')
      cy.get('[data-test-id="textarea-notes"]').type('This is a test reminder.')
      cy.get('[data-test-id="select-remind-at"] [data-test-id="picker-time"] button').click({ force: true })
      cy.get('button[aria-label="Now"]').click({ force: true })
      cy.get('[data-test-id="button-save"]').click()
      cy.get('[data-test-id="span-reminder-title"]').should('exist', 'Test reminder')
      cy.wait(60000)
      cy.get('.toast-body').should('exist')
      cy.get('.custom-select').select('5min')
      cy.clock()
      cy.tick(300000)
      cy.clock().then((clock) => {
        clock.restore()
      })
      // We wait 5m in order the snooze to show up
      cy.get('.toast-body').should('exist', 'This is a test reminder.')
      // Clicking on Dismiss button
      cy.get('.card-body > button').click()
      cy.get('[data-test-id="checkbox-dismiss-reminder"]').should('be.checked')
    })
  })
})
