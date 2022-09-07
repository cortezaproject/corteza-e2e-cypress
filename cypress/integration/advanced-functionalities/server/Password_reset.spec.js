/// <reference types="cypress" />
const baseURL = Cypress.env('BASE_URL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing password reset', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: newEmail, password: newPassword, url: baseURL })
    }
  })

  context('Testing password reset', () => {
    it('should be able to reset the password', () => {
      cy.visit(baseURL + '/auth/login')
      cy.get('[data-test-id="link-request-password-reset"]').click()
      // We wait 1s in order the page to be loaded
      cy.wait(1000)
      cy.url().should('exist', baseURL + '/auth/request-password-reset')
      cy.get('[data-test-id="input-email"]').type('email@domain.com')
      cy.get('[data-test-id="button-password-reset"]').click()
      cy.url().should('exist', baseURL + '/auth/password-reset-requested')
      // We check that the error popup is not shown
      cy.get('.b-toast-danger').should('not.exist')
    })
  })
})