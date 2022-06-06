/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

describe('Testing the log out from everywhere feature', () => {
  before(() => {
    cy.login({ changePassword: true })
  })

  context('Test for logging out the user from everywhere', () => {
    it('should be able to login and go to login sessions tab and use the log out from everywhere feature ', () => {
      cy.get('[data-test-id="link-tab-login-session"]').click()
      cy.get('[data-test-id="button-logout-from-everywhere"]').click()
    })
  })
})
