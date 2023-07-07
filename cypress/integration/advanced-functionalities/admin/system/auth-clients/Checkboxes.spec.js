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
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).contains('test_auth_client').click({ force: true })
      cy.get('[data-test-id="checkbox-allow-client-to-use-oidc"]').check({ force: true })
      cy.get('[data-test-id="checkbox-allow-client-access-to-discovery"]').check({ force: true })
      cy.get('[data-test-id="checkbox-is-client-trusted"]').check({ force: true })
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
    })

    it('should check if the checkboxes are enabled', () => {
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).contains('test_auth_client').click({ force: true })
      cy.get('[data-test-id="checkbox-allow-client-to-use-oidc"]').should('be.checked')
      cy.get('[data-test-id="checkbox-allow-client-access-to-discovery"]').should('be.checked')
      cy.get('[data-test-id="checkbox-is-client-trusted"]').should('be.checked')
    })
  })
})
