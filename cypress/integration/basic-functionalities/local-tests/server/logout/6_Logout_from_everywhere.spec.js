/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password
const newPassword = Cypress.env('user').newPassword

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
