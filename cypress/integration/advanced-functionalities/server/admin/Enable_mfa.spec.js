/// <reference types="cypress" />
const adminURL = Cypress.env('webappLink').adminURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for enabling multi-factor authentication', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: adminURL })
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
      // We check if the success toast appears
      cy.get('.b-toast-success')
      cy.get('[data-test-id="checkbox-enable-emailOTP"]').should('be.checked')
      cy.get('[data-test-id="checkbox-enable-TOTP"]').should('be.checked')
    })
  })
})
