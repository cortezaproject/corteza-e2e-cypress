/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const newEmail = Cypress.env('user').newEmail
const newPassword = Cypress.env('user').newPassword

describe('Testing github link', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: newEmail, password: newPassword, webappLink: baseURL })
    }
  })

  context('Testing github link', () => {
    it('should be able to click on github and be redirected', () => {
      cy.get('[data-test-id="link-github"]').click()
      cy.url().should('exist', 'https://github.com/cortezaproject/')
    })
  })
})
