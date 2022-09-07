/// <reference types="cypress" />
const baseURL = Cypress.env('BASE_URL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing github link', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: newEmail, password: newPassword, url: baseURL })
    }
  })

  context('Testing github link', () => {
    it('should be able to click on github and be redirected', () => {
      cy.get('[data-test-id="link-github"]').click()
      cy.url().should('exist', 'https://github.com/cortezaproject/')
    })
  })
})
