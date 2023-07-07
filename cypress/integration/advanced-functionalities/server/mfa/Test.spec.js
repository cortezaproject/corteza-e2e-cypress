/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing multi-factor authentication', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: baseURL })
    }
  })
  
  // We'll be testing for now just if multi-factor authentication shows up when enabled.
  // Later on will be tested more in details
  // Ref. https://github.com/jiangts/JS-OTP | https://www.cypress.io/blog/2021/05/11/testing-html-emails-using-cypress/
  context('Testing multi-factor authentication', () => {
    it('should be able to configure TOTP and MFA', () => {
      cy.visit(baseURL + '/auth')
      cy.get('[data-test-id="link-tab-security"]').click()
      cy.get('[data-test-id="button-configure-totp"]').click()
      cy.url().should('exist', baseURL + '/auth/mfa/totp/setup')

      cy.get('[data-test-id="link-redirect-to-profile"]').click()
      cy.get('[data-test-id="link-tab-security"]').click()
      cy.get('[data-test-id="button-enable-email-otp"]').click()
      cy.get('[data-test-id="button-disable-email-otp"]').should('exist')
    })
  })
})
