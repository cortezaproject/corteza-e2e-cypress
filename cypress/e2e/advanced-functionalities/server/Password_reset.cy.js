/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing password reset', () => {
  context('Testing password reset', () => {
    it('should be able to reset the password', () => {
      cy.visit(baseURL + '/auth/login')
      cy.get('[data-test-id="link-request-password-reset"]').click()
      cy.url().should('exist', baseURL + '/auth/request-password-reset')
      cy.get('[data-test-id="input-email"]').type('email@domain.com')
      cy.get('[data-test-id="button-password-reset"]').click()
      cy.url().should('exist', baseURL + '/auth/password-reset-requested')
    })
  })
})
