/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first run the Server signup test 2 in order to create a user so you can log in.
describe('Test for deleting a workflow', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for deleting a workflow', () => {
    it('should be able to delete the workflow', () => {
      cy.contains('Cypress workflow').click()
      cy.get('[data-test-id="button-configure-workflow"]').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
      cy.contains('Cypress workflow').should('not.exist')
    })
  })
})
