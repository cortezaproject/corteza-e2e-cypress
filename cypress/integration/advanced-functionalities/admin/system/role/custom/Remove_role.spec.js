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
    it('should be able to delete a role', () => {
      cy.visit(adminURL + '/')
      // We wait for 4s in order the page to be fully loaded
      cy.wait(4000)
      cy.get('.nav-sidebar').contains('Users').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-search"]').type('Permissions account')
      // We wait for 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.contains('Permissions account').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('.input-group').type('Developer')
      cy.get('.filtered-role').click()
      cy.get('.card-footer:eq(1)').within(() => {
        cy.get('[data-test-id="button-submit"]').click()
        // We wait 2s in order the page to be fully loaded
        cy.wait(2000)
      })
      cy.get('[data-test-id="button-remove-role"]:first').click()
      cy.get('.card-footer:eq(1)').within(() => {
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.contains('Developer').should('not.exist')
    })
  })
})
