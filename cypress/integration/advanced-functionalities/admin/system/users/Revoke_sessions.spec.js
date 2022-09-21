/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for revoking all active sessions of a user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for revoking all active sessions of a user', () => {
    it('should be able to revoking all active sessions', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Users').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.contains('Permissions account').get('#resource-list > tbody > tr:last > td:last > a').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="button-sessions-revoke"]').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('.btn-danger:last').click()
    })
  })
})
