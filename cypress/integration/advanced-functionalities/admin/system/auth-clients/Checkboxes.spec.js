/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for enabling all checkboxes', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for enabling all checkboxes', () => {
    it('should be able to enable the checkboxes', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Auth Clients').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:first > td > a').click()
      cy.get('[data-test-id="checkbox-allow-client-to-use-oidc"]').check({ force: true })
      cy.get('[data-test-id="checkbox-allow-client-access-to-discovery"]').check({ force: true })
      cy.get('[data-test-id="checkbox-is-client-trusted"]').check({ force: true })
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should check if the checkboxes are enabled', () => {
      cy.get('.nav-sidebar').contains('Auth Clients').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:first > td > a').click()
      cy.get('[data-test-id="checkbox-allow-client-to-use-oidc"]').should('be.checked')
      cy.get('[data-test-id="checkbox-allow-client-access-to-discovery"]').should('be.checked')
      cy.get('[data-test-id="checkbox-is-client-trusted"]').should('be.checked')
    })
  })
})
