/// <reference types="cypress" />
const reporterURL = Cypress.env('REPORTER_URL')

describe('Test for reporter sidebar search functionality', () => {
  context('Test for creating report so we can test the sidebar', () => {
    it('should be able to create a report', () => {
      cy.intercept('/api/system/reports/?query=&limit=100&incTotal=true&sort=handle+ASC').as('reports')
      cy.visit(reporterURL + '/list')
      cy.wait('@reports')
      cy.get('[data-test-id="button-create-report"]').click()
      cy.get('[data-test-id="input-name"]').type('Cypress report')
      cy.get('[data-test-id="input-handle"]').type('Cypress')
      cy.get('[data-test-id="button-save"]').click()
    })
  })

  context('Test for reporter sidebar search functionality', () => {
    it('should be able to search for reports', () => {
      cy.intercept('/api/system/reports/?query=&limit=100&incTotal=true&sort=handle+ASC').as('reports')
      cy.visit(reporterURL + '/list')
      cy.wait('@reports')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="input-search"]').type('Cypress')
      cy.get('.nav-sidebar').contains('Cypress report').should('exist')
    })
  })
})
