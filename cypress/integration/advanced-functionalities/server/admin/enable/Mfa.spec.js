/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for enabling multi-factor authentication', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for enabling multi-factor authentication', () => {
    it('should be able to enable multi-factor authentication', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Settings').click()
      // We wait for 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="checkbox-enable-emailOTP"]').check({ force: true })
      cy.get('[data-test-id="checkbox-enable-TOTP"]').check({ force: true })
      cy.get('[data-test-id="button-submit"]').click({ multiple: true, force: true })
      cy.get('[data-test-id="checkbox-enable-emailOTP"]').should('be.checked')
      cy.get('[data-test-id="checkbox-enable-TOTP"]').should('be.checked')
    })
  })
})
