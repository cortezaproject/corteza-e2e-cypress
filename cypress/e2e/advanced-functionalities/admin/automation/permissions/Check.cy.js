/// <reference types="cypress" />
const workflowURL = Cypress.env('WORKFLOW_URL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Test for checking admin automation permissions', () => {
  context('Test for checking admin automation permissions', () => {
    it('should be able to log in and check if grant permissions on automation component is restricted', () => {
      cy.intercept('/api/automation/workflows/?query=&deleted=0&disabled=0&subWorkflow=1&limit=100&incTotal=true&sort=handle+ASC')
        .as('workflows')
      cy.visit(workflowURL + '/list')
      cy.wait('@workflows')
      // First we check if the workflows are present logging in with the super admin account
      cy.get('[data-test-id="no-matches"]').should('not.exist')
      // We first log out so we can log in with the evaluated permission account
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      // We check that the we are not able to see any workflows hence the permission is applied
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
