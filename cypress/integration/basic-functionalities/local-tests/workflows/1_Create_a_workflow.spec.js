/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first run the Server signup test 2 in order to create a user so you can log in.
describe('Test for creating a simple workflow and checking its functionalities', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for creating a workflow with no info entered', () => {
    it('should not be able to create a workflow', () => {
      cy.get('[data-test-id="button-create-workflow"]').click()
      cy.get('[data-test-id="input-label"]').clear()
      cy.get('[data-test-id="button-save-workflow"]').click()
      cy.get('.b-toast-warning') // We check if the warning toast appears
    })
  })

  context('Test for creating a workflow with missing handle', () => {
    it('should not be able to create a workflow with missing handle', () => {
      cy.visit(baseURL + '/list')
      cy.get('[data-test-id="button-create-workflow"]').click()
      cy.get('[data-test-id="button-save-workflow"]').click()
      cy.get('.b-toast-warning') // We check if the warning toast appears
    })
  })

  context('Test for creating a workflow with invalid handle', () => {
    it('should not be able to create a workflow with invalid handle', () => {
      cy.visit(baseURL + '/list')
      cy.get('[data-test-id="button-create-workflow"]').click()
      cy.get('[data-test-id="input-label"]').clear().type('Cypress workflow')
      cy.get('[data-test-id="input-handle"]').type('_')
      cy.get('[data-test-id="input-description"]').type('This is a simple workflow created by an automated cypress test.')
      cy.get('[data-test-id="button-save-workflow"]').click()
      cy.get('[data-test-id="input-handle-invalid-state"]')
      cy.get('.b-toast-warning') // We check if the warning toast appears
    })
  })

  context('Test for checking if export, import and permissions buttons are present when creating a workflow', () => {
    it('should not be able to see the buttons present', () => {
      cy.visit(baseURL + '/list')
      cy.get('[data-test-id="button-create-workflow"]').click()
      cy.get('[data-test-id="button-import-workflow"]').should('not.exist')
      cy.get('[data-test-id="button-export-workflow"]').should('not.exist')
      cy.get('[data-test-id="button-permissions"]').should('not.exist')
    })
  })

  context('Test for creating a new workflow', () => {
    it('should be able to create a new workflow', () => {
      cy.visit(baseURL + '/list')
      cy.get('[data-test-id="button-create-workflow"]').click()
      cy.get('[data-test-id="input-label"]').clear().type('Cypress workflow')
      cy.get('[data-test-id="input-handle"]').type('cypress_workflow')
      cy.get('[data-test-id="input-description"]').type('This is a simple workflow created by an automated cypress test.')
      cy.get('[data-test-id="button-save-workflow"]').click()
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
    })
  })
})
