/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')

describe('Testing authorized clients tab', () => {
  context('Testing authorized clients tab', () => {
    it('should be able to revoke access', () => {
      // We first visit webapp compose in order to make sure that we will have data under authorized clients
      cy.visit(baseURL + '/auth')
      cy.get('[data-test-id="link-tab-authorized-clients"]').click({ force: true })
      cy.get('[data-test-id="button-revoke-access"]').should('exist').click({ force: true })
      cy.get('[data-test-id="button-revoke-access"]').should('not.exist')
    })
  })
})
