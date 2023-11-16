/// <reference types="cypress" />
const workflowURL = Cypress.env('WORKFLOW_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a simple workflow and checking its functionalities', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: workflowURL })
    }
  })

  context('Test for creating a workflow without any data entered or misconfigured field', () => {
    it('should not be able to create a workflow with no info entered', () => {
      cy.visit(workflowURL + '/list')
      cy.get('[data-test-id="button-create-workflow"]').click()
      cy.get('[data-test-id="input-label"]').clear()
      cy.get('[data-test-id="button-save-workflow"].disabled').should("exist")
    })

    it('should not be able to create a workflow with invalid handle', () => {
      cy.visit(workflowURL + '/list')
      cy.get('[data-test-id="button-create-workflow"]').click()
      cy.get('[data-test-id="input-label"]').clear().type('Test workflow')
      cy.get('[data-test-id="input-handle"]').type('_')
      cy.get('[data-test-id="input-description"]').type('This is a simple workflow created by an automated cypress test.')
      cy.get('[data-test-id="button-save-workflow"].disabled').should("exist")
      cy.get('[data-test-id="input-handle-invalid-state"]')
    })

    it('should be able to create a workflow with missing handle', () => {
      cy.get('[data-test-id="input-handle"]', { timeout: 10000 }).clear().type('test')
      cy.get('.modal [data-test-id="button-save-workflow"]').click({ force: true })
    })
  })

  context('Test for checking if export, import and permissions buttons are present when creating a workflow', () => {
    it('should not be able to see the buttons present', () => {
      cy.visit(workflowURL + '/list')
      cy.get('[data-test-id="button-create-workflow"]').click()
      cy.get('[data-test-id="button-import-workflow"]').should('not.exist')
      cy.get('[data-test-id="button-export-workflow"]').should('not.exist')
      cy.get('[data-test-id="button-permissions"]').should('not.exist')
    })
  })

  context('Test for creating a new workflow', () => {
    it('should be able to create a new workflow', () => {
      cy.visit(workflowURL + '/list')
      cy.get('[data-test-id="button-create-workflow"]').click()
      cy.get('[data-test-id="input-label"]').clear().type('Cypress workflow')
      cy.get('[data-test-id="input-handle"]').type('cypress_workflow')
      cy.get('[data-test-id="input-description"]').type('This is a simple workflow created by an automated cypress test.')
      cy.get('.modal [data-test-id="button-save-workflow"]').click({ force: true })
    })
  })
})
