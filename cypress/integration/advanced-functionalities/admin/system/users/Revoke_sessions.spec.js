/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for revoking all active sessions of a user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for revoking all active sessions of a user', () => {
    it('should be able to revoking all active sessions', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/users/?query=&deleted=0&suspended=0&limit=100&incTotal=true&sort=createdAt+DESC').as('users')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/user"]').click({ force: true })
      cy.wait('@users')
      cy.contains('Permissions account').get('#resource-list > tbody > tr:last').click()
      cy.get('[data-test-id="button-sessions-revoke"]').click()
      cy.get('.btn-danger:last').click()
    })
  })
})
