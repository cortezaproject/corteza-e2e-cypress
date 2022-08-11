/// <reference types="cypress" />
const adminURL = Cypress.env('webappLink').adminURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for deleting a template', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: adminURL })
    }
  })

  context('Test for deleting a template', () => {
    it('should be able to delete a template', () => {
      // We wait for 2s in order the page to be fully loaded/rendered
      cy.wait(2000) 
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
  })
})
