/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for adding an impersonate user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for adding an impersonate user', () => {
    it('should be able to add an impersonate user', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).contains('test_auth_client').click({ force: true })
      cy.get('.custom-control:eq(1)').click()
      cy.get('[data-test-id="impersonate-user"]').click({ force: true })
      cy.get('[data-test-id="select-user"]').type('Permissions account{enter}')
      cy.get('.card-footer > [data-test-id="button-submit"]').click({ force: true })
    })

    it('should be able to generate cURL snippet', () => {
      // Click on Generate cURL snippet button
      cy.get('[data-test-id="button-cURL-snippet"]').click({ force: true })
      cy.get('[data-test-id="cURL-string"]', { timeout: 10000 }).should('exist')
      // Click on Hide cURLsnippet button
      cy.get('[data-test-id="button-cURL-snippet"]').click({ force: true })
      cy.get('[data-test-id="cURL-string"]').should('not.exist')
    })
  })
})
