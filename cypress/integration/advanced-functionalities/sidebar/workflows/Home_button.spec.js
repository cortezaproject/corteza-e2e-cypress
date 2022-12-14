/// <reference types="cypress" />
const workflowURL = Cypress.env('WORKFLOW_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for sidebar home button functionality', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: workflowURL })
    }
  })
  context('Test for sidebar home button functionality', () => {
    it('should be able to click on home button and be redirected on main list', () => {
      cy.visit(workflowURL + '/list')
      // We wait for 1s in order the page to be loaded
      cy.wait(1000)
      // We click on the first workflow
      cy.get('#resource-list > tbody > tr:first').click()
      // We wait for 1s the process to be finished
      cy.wait(1000)
      cy.get('[data-test-id="button-home"]').click()
      // We wait for 1s the process to be finished
      cy.wait(1000)
      // We check if the button for creating a new WF is present, indicating that we are back on main page
      cy.get('[data-test-id="button-create-workflow"]').should('exist')
    })
  })
})
