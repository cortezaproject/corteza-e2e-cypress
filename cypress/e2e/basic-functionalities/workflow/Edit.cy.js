/// <reference types="cypress" />
import { provisionAll, provisionDefaultWorkflowCreate } from '../../../provision/list'

const workflowURL = Cypress.env('WORKFLOW_URL')

describe('Test for editing a workflow', () => {
  before(() => {
    cy.seedDb([...provisionAll, ...provisionDefaultWorkflowCreate])
  })

  beforeEach(() => {
    cy.preTestLogin({ url: workflowURL })

    cy.intercept('/api/automation/workflows/?query=cypress&deleted=0&disabled=0&subWorkflow=1&limit=100&incTotal=true&pageCursor=&sort=handle+ASC')
      .as('wf_cypress')
    cy.visit(workflowURL + '/list')
    cy.searchItem()
    cy.wait('@wf_cypress')
    cy.contains('Cypress workflow', { timeout: 10000 }).click({ force: true })
    cy.get('[data-test-id="button-configure-workflow"]').click({ force: true })
  })

  context('Test for checking if export, import and permissions buttons are present when editing a workflow', () => {
    it('should be able to see the buttons', () => {
      cy.get('[data-test-id="button-import-workflow"]').should('exist')
      cy.get('[data-test-id="button-export-workflow"]').should('exist')
      cy.get('[data-test-id="button-permissions"]').should('exist')
    })
  })

  context('Test for editing a workflow', () => {
    it('should be able to edit the workflow and check if the changes are persisted', () => {
      cy.get('[data-test-id="input-label"]').type(' edited')
      cy.get('[data-test-id="input-handle"]').type('_edited')
      cy.get('[data-test-id="input-description"]').clear().type('Edited description.')
      cy.get('.modal [data-test-id="button-save-workflow"]', { timeout: 10000 }).click({ force: true })
      cy.get('.close').click({ multiple: true })

      // Check if the changes were persisted
      cy.get('[data-test-id="button-configure-workflow"]').click({ force: true })
      cy.get('[data-test-id="input-label"]').should('have.value', 'Cypress workflow edited')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_workflow_edited')
      cy.get('[data-test-id="input-description"]').should('have.value', 'Edited description.')
    })
  })
})
