/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Test for creating a user with limited permissions', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating additional user', () => {
    it('should create a user that will have limited permissions', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/users/?query=&deleted=0&suspended=0&limit=100&incTotal=true&sort=createdAt+DESC').as('users')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/user"]').click({ force: true })
      cy.wait('@users')
      cy.get('[data-test-id="button-new-user"]').click({ force: true })
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-name"]').type('Permissions account')
      cy.get('[data-test-id="input-handle"]').type('permissions_account')
      cy.get('[data-test-id="button-submit"]').click({ force: true })
      cy.get('[data-test-id="card-user-password"]').within(() => {
        cy.get('[data-test-id="input-new-password"]', { timeout: 10000 }).type(newPassword, { force: true })
        cy.get('[data-test-id="input-confirm-password"]', { timeout: 10000 }).type(newPassword, { force: true })
        cy.get('[data-test-id="button-submit"]', { timeout: 10000 }).click({ force: true }).get('svg .fa-check').should('not.exist')
      })
    })

    it('should check if password was set', () => {
      cy.get('[data-test-id="card-external-auth-providers"]').within(() => {
        cy.contains('password').should('exist')
      })
    })
  })
})
