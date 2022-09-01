/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const newEmail = Cypress.env('user').newEmail
const newPassword = Cypress.env('user').newPassword

describe('Testing authorized clients tab', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: newEmail, password: newPassword, webappLink: baseURL })
    }
  })

  context('Testing authorized clients tab', () => {
    it('should be able to revoke access', () => {
      // We first visit webapp compose in order to make sure that we will have data under authorized clients
      cy.visit(baseURL + '/compose/namespaces')
      // We wait 2s in order the page to be loaded
      cy.wait(2000)
      cy.visit(baseURL + '/auth')
      cy.get('[data-test-id="link-tab-authorized-clients"]').click()

      cy.get('[data-test-id="button-revoke-access"]').should('exist').click()
      // We check if the success toast appears
      cy.get('.border-primary')
      cy.get('[data-test-id="button-revoke-access"]').should('not.exist')
    })
  })
})
