/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for un-deleting auth client', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for un-deleting auth client', () => {
    it('should be able to un-delete an auth client ', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.intercept('/api/system/auth/clients/?deleted=2&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('filter')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.get('[data-test-id="filter-deleted-auth-clients"] input[value="2"]').click({ force: true })
      cy.wait('@filter')
      cy.contains('Test auth client').get('.text-secondary').should('exist')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 })
        .contains('test_auth_client')
        .should('exist', 'Deleted').click()
      cy.get('[data-test-id="input-deleted-at"]').should('exist')
      cy.get('[data-test-id="button-undelete"]').click()
      cy.get('.confirmation-confirm', { timeout: 10000 }).click({ force: true })
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.contains('Test auth client').should('exist')
    })
  })
})
