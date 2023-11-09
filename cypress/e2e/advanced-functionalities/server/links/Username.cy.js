/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing username link', () => {
  beforeEach(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: newEmail, password: newPassword, url: baseURL })
    }
  })

  context('Testing username link', () => {
    it('should be able to click on user name and be redirected to your profile tab', () => {
      cy.get('[data-test-id="link-redirect-to-profile"]').click()
      cy.url().should('exist', baseURL + '/auth/')
    })
  })
})
