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
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Auth Clients').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="filter-deleted-auth-clients"]').contains('Only').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.contains('Test auth client').get('.text-secondary').should('exist')
      cy.get('#resource-list > tbody > tr:first > td > a').should('exist', 'Deleted').click()
      cy.get('[data-test-id="deleted-at"]').should('exist')
      cy.get('[data-test-id="button-undelete"]').click()
      cy.get('.btn-danger').click()
      cy.get('.nav-sidebar').contains('Auth Clients').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.contains('Test auth client').should('exist')
    })
  })
})
