/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting an integration gateway', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for deleting an integration gateway', () => {
    it('should check whether the correct buttons and states are shown', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Integration Gateway').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-search"]').type('/testEdited')
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="input-delete-at"]').should('not.exist')
      cy.get('[data-test-id="input-updated-at"]').should('exist')
      cy.get('[data-test-id="input-create-at"]').should('exist')
      cy.get('[data-test-id="button-submit"]').should('exist')
      cy.get('[data-test-id="button-add"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('exist')
      cy.get('[data-test-id="button-undelete"]').should('not.exist')
    })

    it('should be able to delete an integration gateway', () => {
      cy.get('[data-test-id="card-route-edit"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      cy.get('[data-test-id="input-search"]').type('/testEdited')
      cy.get('[data-test-id="no-matches"]').should('exist')
    })

    it('should check whether the route is present in the deleted filter', () => {
      cy.get('[data-test-id="filter-deleted-routes"]').contains('Only').click()
      cy.get('[data-test-id="input-search"]').clear().type('/testEdited')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('tr:last').within(() => {
        cy.contains('/testEdited').should('exist')
      })
    })
  })
})
