/// <reference types="cypress" />
const workflowURL = Cypress.env('WORKFLOW_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for sidebar home button functionality', () => {
  context('Test for sidebar home button functionality', () => {
    it('should be able to click on home button and be redirected on main list', () => {
      cy.intercept('/api/automation/workflows/?query=&deleted=0&disabled=0&subWorkflow=1&limit=100&incTotal=true&sort=handle+ASC')
        .as('workflows')
      cy.visit(workflowURL + '/')
      cy.wait("@workflows")
      cy.get('[data-test-id="dropdown-profile"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="dropdown-profile-logout"]', { timeout: 10000 }).click({ force: true })
      cy.login({ email, password, url: workflowURL })
      cy.get('#resource-list td:nth-child(2):first', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-home"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-create-workflow"]', { timeout: 10000 }).should('exist')
    })
  })
})
