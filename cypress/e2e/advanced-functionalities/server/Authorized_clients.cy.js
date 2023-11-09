/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing authorized clients tab', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: newEmail, password: newPassword, url: baseURL })
    }
  })

  context('Testing authorized clients tab', () => {
    it('should be able to revoke access', () => {
      // We first visit webapp compose in order to make sure that we will have data under authorized clients
      cy.visit(baseURL + '/auth')
      cy.get('[data-test-id="link-tab-authorized-clients"]').click()
      cy.get('[data-test-id="button-revoke-access"]').should('exist').click()
      cy.get('[data-test-id="button-revoke-access"]').should('not.exist')
    })
  })
})
