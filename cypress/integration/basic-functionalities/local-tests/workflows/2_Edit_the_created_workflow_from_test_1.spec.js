/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe('Test for editing a workflow', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for editing a workflow', () => {
    it('should be able to edit the workflow', () => {
      cy.contains('Cypress workflow').click()
      cy.get('[data-test-id="button-configure-workflow"]').click()
      cy.get('[data-test-id="input-label"]').type(' edited')
      cy.get('[data-test-id="input-handle"]').type('_edited')
      cy.get('[data-test-id="input-description"]').type(' And this description just got edited.')
      cy.get('[data-test-id="button-save-workflow"]').click()
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
      cy.get('.close').click({ multiple: true })
    })
  })
})
