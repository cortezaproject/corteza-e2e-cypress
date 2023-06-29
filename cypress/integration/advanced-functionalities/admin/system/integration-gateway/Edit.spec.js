/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing an integration gateway', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for editing an integration gateway', () => {
    it('should check whether the correct buttons and states are shown', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Integration Gateway').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-search"]').type('/test')
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="input-delete-at"]').should('not.exist')
      cy.get('[data-test-id="input-update-at"]').should('not.exist')
      cy.get('[data-test-id="input-create-at"]').should('exist')
      cy.get('[data-test-id="button-submit"]').should('exist')
      cy.get('[data-test-id="button-add"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('exist')
      cy.get('[data-test-id="button-undelete"]').should('not.exist')
    })

    it('should be able to edit an integration gateway', () => {
      cy.get('[data-test-id="input-endpoint"]').type('Edited')
      cy.get('[data-test-id="card-route-edit"]').within(() => {
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('[data-test-id="input-updated-at"]').should('exist')
      cy.get('[data-test-id="input-endpoint"]').should('have.value', '/testEdited')
    })
  })
})
