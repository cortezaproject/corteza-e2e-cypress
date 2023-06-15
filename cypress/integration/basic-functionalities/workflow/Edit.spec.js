/// <reference types="cypress" />
const workflowURL = Cypress.env('WORKFLOW_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing a workflow', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: workflowURL })
    }
  })

  context('Test for checking if export, import and permissions buttons are present when editing a workflow', () => {
    it('should be able to see the buttons', () => {
      cy.intercept('/api/automation/workflows/?query=cypress&deleted=0&disabled=0&subWorkflow=1&limit=100&incTotal=true&pageCursor=&sort=handle+ASC').as('wf_cypress')
      cy.visit(workflowURL + '/list')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.wait("@wf_cypress")
      cy.contains('Cypress workflow', { timeout: 10000 }).click()
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
    })

    it('should be edited', () => {
      // We check below if the fields were really edited/changed
      cy.get('[data-test-id="button-configure-workflow"]').click()
      cy.get('[data-test-id="input-label"]').should('have.value', 'Cypress workflow edited')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_workflow_edited')
      cy.get('[data-test-id="input-description"]').should('have.value', 'Edited description.')
    })
  })
})
