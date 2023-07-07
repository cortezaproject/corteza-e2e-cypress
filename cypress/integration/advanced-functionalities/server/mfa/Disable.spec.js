/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL_NEW')
const password = Cypress.env('USER_PASSWORD_NEW')

describe('Test for disabling multi-factor authentication', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for disabling multi-factor authentication', () => {
    it('should be able to disable multi-factor authentication', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/settings/').as('auth-settings')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/settings"]').click({ force: true })
      cy.wait('@auth-settings')
      cy.get('[data-test-id="checkbox-enable-emailOTP"]').uncheck({ force: true })
      cy.get('[data-test-id="checkbox-enable-TOTP"]').uncheck({ force: true })
      cy.get('[data-test-id="button-submit"]:first').click({ force: true })
      cy.get('[data-test-id="checkbox-enable-emailOTP"]').should('not.be.checked')
      cy.get('[data-test-id="checkbox-enable-TOTP"]').should('not.be.checked')
    })
  })
})
