/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')
const adminURL = Cypress.env('ADMIN_URL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing multi-factor authentication', () => {
  before(() => {
    cy.get('[data-test-id="dropdown-profile"]').click({ force: true })
    cy.get('[data-test-id="dropdown-profile-logout"]').click({ force: true })
    cy.login({ email: newEmail, password: newPassword, url: adminURL })
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
      cy.get('[data-test-id="button-enable-email-otp"]').should('not.exist')
      cy.get('[data-test-id="button-disable-email-otp"]').should('exist')
    })

    it('should disable MFA', () => {
      cy.get('[data-test-id="button-disable-email-otp"]').click({ force: true })
      cy.get('[data-test-id="button-disable-email-otp"]').should('not.exist')
      cy.get('[data-test-id="button-enable-email-otp"]').should('exist')
    })

    it('should be able to logout', () => {
      cy.get('[data-test-id="link-logout"]', { timeout: 10000 }).click({ force: true })
      cy.clearAllSessionStorage()
    })
  })
})
