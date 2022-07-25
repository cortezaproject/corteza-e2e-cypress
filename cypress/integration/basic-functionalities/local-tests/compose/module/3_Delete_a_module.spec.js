/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up, create a namespace and a module
describe('Test for editing a module', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for deleting a module', () => {
    it('should be able to delete the module', () => {
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('[data-test-id="table-modules-list"] > tbody').find(':first').click()
      cy.get('[data-test-id="editor-toolbar"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('[data-test-id="button-delete-confirm"]').click()
      })
      // We check if the success toast appears
      cy.get('.b-toast-success') 
      cy.contains('cypress_module').should('not.exist')
    })
  })
})
