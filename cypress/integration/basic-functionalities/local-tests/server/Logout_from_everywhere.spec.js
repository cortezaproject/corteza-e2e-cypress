/// <reference types="cypress" />
const baseURL = Cypress.env('BASE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing the log out from everywhere feature', () => {
  before(() => {
    cy.login({ email, password: newPassword, buttonLoginID: 'button-login-and-remember' })
    // We check if the success toast appears
    cy.get('.border-primary')
  })

  context('Test for logging out the user from everywhere', () => {
    it('should be able to login and go to login sessions tab and use the log out from everywhere feature ', () => {
      cy.get('[data-test-id="link-tab-login-session"]').click()
      cy.get('[data-test-id="button-logout-from-everywhere"]').click()
      // We check if the success toast appears
      cy.get('.border-primary')
    })
  })
})
