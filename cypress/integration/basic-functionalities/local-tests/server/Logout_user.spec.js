/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password
const newPassword = Cypress.env('user').newPassword

describe('Test for logging out the user', () => {
  before(() => {
    cy.login({ email, password: newPassword, buttonLoginID: 'button-login-and-remember' })
    // We wait three seconds in order the page content to be fully loaded
    cy.wait(3000)
    // We check if the success toast appears
    cy.get('.border-primary') 
  })

  context('Test for logging out the logged in user', () => {
    it('should be able log out the user', () => {
      cy.get('[data-test-id="link-logout"]').click()
      cy.contains('Logout successful.').should('exist')
    })
  })
})
