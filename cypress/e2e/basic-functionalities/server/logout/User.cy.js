/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Test for logging out the user', () => {
  before(() => {
    cy.login({ email, password: newPassword, buttonLoginID: 'button-login-and-remember', url: baseURL })
    // We check if the success toast appears
    cy.get('.border-primary', { timeout: 10000 })
  })

  context('Test for logging out the logged in user', () => {
    it('should be able log out the user', () => {
      cy.get('[data-test-id="link-logout"]', { timeout: 10000 }).click()
      cy.contains('Logout successful').should('exist')
    })
  })
})
