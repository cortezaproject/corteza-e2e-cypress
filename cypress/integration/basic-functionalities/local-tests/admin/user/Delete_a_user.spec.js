/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for deleting a user', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for deleting a user', () => {
    it('should be able to delete a user', () => {
      // We wait for 2s in order the page to be fully loaded/rendered
      cy.wait(2000) 
      cy.get('.nav-sidebar').contains('Users').click()
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success') 
      cy.contains('automated').should('not.exist')
    })
  })
})
