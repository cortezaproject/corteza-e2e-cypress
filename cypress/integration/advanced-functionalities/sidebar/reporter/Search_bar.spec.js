/// <reference types="cypress" />
const reporterURL = Cypress.env('REPORTER_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for reporter sidebar search functionality', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: reporterURL })
    }
  })

  context('Test for creating report so we can test the sidebar', () => {
    it('should be able to create a report', () => {
      cy.visit(reporterURL + '/list')
      cy.get('[data-test-id="button-create-report"]').click()
      cy.get('[data-test-id="input-name"]').type('Cypress report')
      cy.get('[data-test-id="input-handle"]').type('Cypress')
      cy.get('[data-test-id="button-save"]').click()
      // We wait for 1s the process to be finished
      cy.wait(1000)
    })
  })

  context('Test for reporter sidebar search functionality', () => {
    it('should be able to search for reports', () => {
      cy.visit(reporterURL + '/list')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      // We click on the created report
      cy.get('#resource-list > tbody > :first-child()').click()
      cy.get('[data-test-id="input-search"]').type('Cypress')
      // We wait for 1s in order the search to be finished
      cy.wait(1000)
      cy.get('.nav-sidebar').contains('Cypress report').should('exist')
    })
  })
})
