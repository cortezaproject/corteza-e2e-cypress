/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for un-deleting an integration gateway', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for un-deleting an integration gateway', () => {
    it('should check whether the correct buttons and states are shown', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Integration Gateway').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="filter-deleted-routes"]').contains('Only').click()
      cy.get('[data-test-id="input-search"]').type('/testEdited')
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="input-delete-at"]').should('exist')
      cy.get('[data-test-id="input-updated-at"]').should('exist')
      cy.get('[data-test-id="input-create-at"]').should('exist')
      cy.get('[data-test-id="button-submit"]').should('exist')
      cy.get('[data-test-id="button-add"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('not.exist')
      cy.get('[data-test-id="button-undelete"]').should('exist')
    })

    it('should be able to un-delete an integration gateway', () => {
      cy.get('[data-test-id="card-route-edit"]').within(() => {
        cy.get('[data-test-id="button-undelete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('.nav-sidebar').contains('Integration Gateway').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-search"]').type('/testEdited')
      cy.get('[data-test-id="no-matches"]').should('not.exist')
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="input-delete-at"]').should('not.exist')
    })

    it('should check that the route is not present in the deleted filter', () => {
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.nav-sidebar').contains('Integration Gateway').click()
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('[data-test-id="filter-deleted-routes"]').contains('Only').click()
      cy.get('[data-test-id="input-search"]').type('/testEdited')
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
