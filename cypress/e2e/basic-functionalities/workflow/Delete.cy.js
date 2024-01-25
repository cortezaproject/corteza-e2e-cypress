/// <reference types="cypress" />
import { provisionAll, provisionDefaultWorkflowCreate } from '../../../provision/list'

const workflowURL = Cypress.env('WORKFLOW_URL')

describe('Test for deleting a workflow', () => {
  before(() => {
    cy.seedDb([...provisionAll, ...provisionDefaultWorkflowCreate])
    cy.preTestLogin({ url: workflowURL })
  })

  context('Test for deleting a workflow and confirm it was deleted', () => {
    it('should be able to delete the workflow', () => {
      cy.intercept('/api/automation/workflows/?query=Cypress&deleted=0&disabled=0&subWorkflow=1&limit=100&incTotal=true&pageCursor=&sort=handle+ASC').as('cypress_wf')
      cy.intercept('/api/automation/workflows/?query=test&deleted=0&disabled=0&subWorkflow=1&limit=100&incTotal=true&pageCursor=&sort=handle+ASC').as('test_wf')
      cy.visit(workflowURL + '/list')
      cy.searchItem({ item: 'Cypress' })
      cy.wait('@cypress_wf')
      cy.contains('Cypress workflow').should('exist').click({ force: true })
      cy.get('[data-test-id="button-configure-workflow"]').click({ force: true })
      cy.get('[data-test-id="button-delete"]').click({ force: true })
      cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
      cy.contains('Cypress workflow').should('not.exist')
    })
  })
})
