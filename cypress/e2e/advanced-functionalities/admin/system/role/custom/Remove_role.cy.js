/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a role', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for deleting a role', () => {
    it('should be able to add a role for deleting', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/users/?query=Permissions+account&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('user')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/user"]').click({ force: true })
      cy.get('[data-test-id="input-search"]').type('Permissions account')
      cy.wait('@user')
      cy.contains('Permissions account').get('#resource-list > tbody > tr:last').click({ force: true })
      cy.get('[data-test-id="input-role-picker"]').type('Developer{enter}')
      cy.get('[data-test-id="card-role-membership"]').within(() => {
        cy.get('[data-test-id="button-submit"]').click({ force: true })
      })
    })

    it('should be able to delete a role', () => {
      cy.get('[data-test-id="card-role-membership"]').within(() => {
        cy.contains('Developer').should('exist')
        cy.get('[data-test-id="button-delete"]:first', { timeout: 10000 })
          .should('exist')
          .click({ force: true })
        cy.get('[data-test-id="button-delete-confirm"]', { timeout: 10000 })
          .click({ force: true })
        cy.get('[data-test-id="button-submit"]').click({ force: true })
        cy.contains('Role membership').should('exist')
        cy.contains('Developer').should('not.exist')
      })
    })
  })
})
