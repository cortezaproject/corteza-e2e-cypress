/// <reference types="cypress" />
const workflowURL = Cypress.env('WORKFLOW_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a workflow', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: workflowURL })
    }
  })

  context('Test for deleting a workflow', () => {
    it('should be able to delete the workflow', () => {
      cy.intercept('/api/automation/workflows/?query=Cypress&deleted=0&disabled=0&subWorkflow=1&limit=100&incTotal=true&pageCursor=&sort=handle+ASC').as('cypress_wf')
      cy.intercept('/api/automation/workflows/?query=test&deleted=0&disabled=0&subWorkflow=1&limit=100&incTotal=true&pageCursor=&sort=handle+ASC').as('test_wf')
      cy.visit(workflowURL + '/list')
      cy.get('[data-test-id="input-search"]').type('Cypress')
      cy.wait("@cypress_wf")
      //cy.get('tbody > tr:last').click()
      cy.contains('Cypress workflow').should('exist').click()
      cy.get('[data-test-id="button-configure-workflow"]').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.contains('Cypress workflow').should('not.exist')
      
      cy.get('[data-test-id="input-search"]').type('test')
      cy.wait("@test_wf")
      //cy.get('tbody > tr:last').click()
      cy.contains('Test workflow').should('exist').click()
      cy.get('[data-test-id="button-configure-workflow"]').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.contains('Test workflow').should('not.exist')
    })
  })
})
