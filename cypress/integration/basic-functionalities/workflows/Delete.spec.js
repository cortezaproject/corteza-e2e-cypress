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
      cy.visit(workflowURL + '/list')
      cy.get('[data-test-id="input-search"]').type('Cypress')
      // We wait 1s in order the search to be finished
      cy.wait(1000)
      cy.get('tbody > tr:last').click()
      cy.contains('Cypress workflow').should('exist')
      cy.get('[data-test-id="button-configure-workflow"]').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.contains('Cypress workflow').should('not.exist')
    })
  })
})