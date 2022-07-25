/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up
describe('Test for deleting an application', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for deleting an application', () => {
    it('should be able to delete it', () => {
      // We wait for 2s in order the page to be fully loaded/rendered
      cy.wait(2000)
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('automated application')
      // We wait 2s in order the search to be completed
      cy.wait(2000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('[data-test-id="input-search"]').type('automated application')
      cy.contains('automated application').should('not.exist')
    })
  })
})
