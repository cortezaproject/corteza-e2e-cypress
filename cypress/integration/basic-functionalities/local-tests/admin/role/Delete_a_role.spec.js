/// <reference types="cypress" />
const adminURL = Cypress.env('webappLink').adminURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for deleting a role', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: adminURL })
    }
  })

  context('Test for deleting a role', () => {
    it('should be able to delete it', () => {
      // We wait for 2s in order the page to be fully loaded/rendered
      cy.wait(2000) 
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="input-search"]').type('automated')
      // We wait 2s in order the search to be completed
      cy.wait(2000) 
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success') 
      cy.get('[data-test-id="input-search"]').type('automated')
      cy.contains('automated').should('not.exist')
    })
  })
})
