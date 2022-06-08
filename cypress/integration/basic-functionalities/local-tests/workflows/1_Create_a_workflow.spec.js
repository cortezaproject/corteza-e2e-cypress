/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe('Test for creating a simple workflow', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for creating a new workflow', () => {
    it('should be able to create a new workflow', () => {
      cy.get('[data-test-id="button-create-workflow"]').click()
      cy.get('[data-test-id="input-label"]').clear().type('Cypress workflow')
      cy.get('[data-test-id="input-handle"]').type('cypress_workflow')
      cy.get('[data-test-id="input-description"]').type('This is a simple workflow created by an automated cypress test.')
      cy.get('[data-test-id="button-save-workflow"]').click()
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
    })
  })
})
