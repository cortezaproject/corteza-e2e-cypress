/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up
describe('Test for deleting a role', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for deleting a role', () => {
    it('should be able to delete it', () => {
      cy.wait(2000) // We wait for 2s in order the page to be fully loaded/rendered
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="input-search"]').type('automated')
      cy.wait(2000) // We wait 2s in order the search to be completed
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
      cy.get('[data-test-id="input-search"]').type('automated')
      cy.contains('automated').should('not.exist')
    })
  })
})
