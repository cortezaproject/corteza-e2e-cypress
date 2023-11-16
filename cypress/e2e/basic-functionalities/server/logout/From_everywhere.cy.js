/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing the log out from everywhere feature', () => {
  before(() => {
    cy.login({ email, password: newPassword, url: baseURL })
  })

  context('Test for logging out the user from everywhere', () => {
    it('should be able to login and go to login sessions tab and use the log out from everywhere feature ', () => {
      cy.get('[data-test-id="link-tab-login-session"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-logout-from-everywhere"]', { timeout: 10000 }).click()
      // We check if the success toast appears
      cy.get('.border-primary', { timeout: 10000 })
    })
  })
})
