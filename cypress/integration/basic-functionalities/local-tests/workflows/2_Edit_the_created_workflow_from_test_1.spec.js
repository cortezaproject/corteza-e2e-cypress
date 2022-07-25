/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first run the Server signup test 2 in order to create a user so you can log in.
describe('Test for editing a workflow', () => {
  before(() => {
    cy.login({ email, password })
  })
  context('Test for checking if export, import and permissions buttons are present when editing a workflow', () => {
    it('should be able to see the buttons', () => {
      cy.contains('Cypress workflow').click()
      cy.get('[data-test-id="button-configure-workflow"]').click()
      cy.get('[data-test-id="button-import-workflow"]')
      cy.get('[data-test-id="button-export-workflow"]')
      cy.get('[data-test-id="button-permissions"]')
    })
  })

  context('Test for editing a workflow', () => {
    it('should be able to edit the workflow', () => {
      cy.get('[data-test-id="input-label"]').type(' edited')
      cy.get('[data-test-id="input-handle"]').type('_edited')
      cy.get('[data-test-id="input-description"]').clear().type('Edited description.')
      cy.get('[data-test-id="button-save-workflow"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success') 
      cy.get('.close').click({ multiple: true })

      // We check below if the fields were really edited/changed
      cy.get('[data-test-id="button-configure-workflow"]').click()
      cy.get('[data-test-id="input-label"]').should('have.value', 'Cypress workflow edited')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_workflow_edited')
      cy.get('[data-test-id="input-description"]').should('have.value', 'Edited description.')
    })
  })
})
