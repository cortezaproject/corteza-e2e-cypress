/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_PASSWORD_NEW')
const password = Cypress.env('USER_EMAIL_NEW')

describe('Test for deleting a user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for deleting a user', () => {
    it('should be able to delete a user', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/users/?query=&deleted=0&suspended=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('users')
      cy.intercept('/api/system/users/?query=Permissions&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/user"]').click({ force: true })
      cy.wait('@users')
      cy.get('[data-test-id="input-search"]').type('Permissions')
      cy.wait('@search')
      cy.contains('Permissions account').get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-user-info"] [data-test-id="button-delete"] button', { timeout: 10000 })
        .click({ force: true })
      cy.get('.confirmation-confirm', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="dropdown-profile"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="dropdown-profile-logout"]', { timeout: 10000 }).click({ force: true })
    })
  })
})
