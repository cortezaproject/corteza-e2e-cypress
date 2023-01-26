/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a template', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for deleting a template', () => {
    it('should be able to delete a template', () => {
      // We wait for 3s in order the page to be fully loaded/rendered
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="input-search"]').type('automated_template')
      // We wait 2s in order the search to be completed
      cy.wait(2000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('[data-test-id="input-search"]').type('automated_template')
      cy.contains('automated_template').should('not.exist')
    })

    it('should be able to delete the remaining created templates', () => {
      cy.get('[data-test-id="input-search"]').clear().type('duplicate')
      // We wait 2s in order the search to be completed
      cy.wait(2000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
    })
  })
})
