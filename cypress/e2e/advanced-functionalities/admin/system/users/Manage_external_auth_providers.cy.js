/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for managing external providers of a user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for managing external providers of a user', () => {
    it('should be able to have external provider of type password', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/users/?query=&deleted=0&suspended=0&limit=100&incTotal=true&sort=createdAt+DESC').as('users')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/user"]').click({ force: true })
      cy.wait('@users')
      // We click on the edit icon on the Permissions account
      cy.contains('Permissions account').get('#resource-list > tbody > tr:last').click()
      cy.get('[data-test-id="card-external-auth-providers"]').within(() => {
        cy.contains('password').should('exist')
      })
    })

    it('should create new user from admin so it will not have external provider present', () => {
      cy.intercept('/api/system/users/?query=&deleted=0&suspended=0&limit=100&incTotal=true&sort=createdAt+DESC').as('users')
      cy.get('.nav-sidebar').find('a[href="/system/user"]').click({ force: true })
      cy.wait('@users')
      cy.get('[data-test-id="button-new-user"]').click()
      cy.get('[data-test-id="input-email"]').clear().type('auth@email.com')
      cy.get('[data-test-id="input-name"]').clear().type('auth account')
      cy.get('[data-test-id="input-handle"]').clear().type('auth_account')
      cy.get('[data-test-id="button-submit"]').click()
      cy.get('[data-test-id="card-external-auth-providers"]').within(() => {
        cy.contains('password').should('not.exist')
      })
    })
  })
})
