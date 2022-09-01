/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const newEmail = Cypress.env('user').newEmail
const newPassword = Cypress.env('user').newPassword

describe('Testing username link', () => {
  beforeEach(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: newEmail, password: newPassword, webappLink: baseURL })
    }
  })

  context('Testing username link', () => {
    it('should be able to click on user name and be redirected to your profile tab', () => {
      cy.get('[data-test-id="link-redirect-to-profile"]').click()
      cy.url().should('exist', baseURL + '/auth/')
    })
  })
})
