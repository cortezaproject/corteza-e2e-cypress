/// <reference types="cypress" />
const reporterURL = Cypress.env('REPORTER_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a report', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: reporterURL })
    }
  })

  context('Test for deleting a report', () => {
    it('should be able to delete a report successfully', () => {
      cy.intercept('/api/system/reports/?query=&limit=100&incTotal=true&sort=handle+ASC')
        .as('reports')
      cy.intercept('/api/system/reports/?query=cypress_handle&limit=100&incTotal=true&pageCursor=&sort=handle+ASC')
        .as('report-search')
      cy.visit(reporterURL + '/list')
      cy.wait('@reports')
      cy.get('[data-test-id="input-search"]').type('cypress_handle')
      cy.wait('@report-search')
      cy.get('[data-test-id="button-report-edit"]').click({ force: true })
      cy.get('[data-test-id="button-delete"]').click({ force: true })
      cy.get('[data-test-id="button-delete-confirm"]', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.get('[data-test-id="input-search"]').type('cypress_handle')
      cy.wait('@report-search')
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
