/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing Corteza logo', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: newEmail, password: newPassword, url: baseURL })
    }
  })

  context('Testing Corteza logo', () => {
    it('should be able to click on Corteza logo and be redirected to log in screen', () => {
      // We wait 1s in order the page to be loaded
      cy.wait(1000)
      cy.get('[data-test-id="img-corteza-logo"]').click()
      cy.url().should('exist', baseURL + '/auth/')
    })
  })
})
