/// <reference types="cypress" />
const workflowURL = Cypress.env('webappLink').workflowURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for deleting a workflow', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: workflowURL })
    }
  })

  context('Test for deleting a workflow', () => {
    it('should be able to delete the workflow', () => {
      cy.visit(workflowURL + '/list')
      cy.contains('Cypress workflow').click()
      cy.get('[data-test-id="button-configure-workflow"]').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success') 
      cy.contains('Cypress workflow').should('not.exist')
    })
  })
})
