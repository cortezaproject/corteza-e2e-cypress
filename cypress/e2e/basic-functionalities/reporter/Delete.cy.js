/// <reference types="cypress" />
import { provisionAll, provisionDefaultReportCreate } from '../../../provision/list'

const reporterURL = Cypress.env('REPORTER_URL')

describe('Test for deleting a report', () => {
  before(() => {
    cy.seedDb([...provisionAll, ...provisionDefaultReportCreate])
    cy.preTestLogin({ url: reporterURL })
  })

  context('Test for deleting a report', () => {
    it('should be able to delete a report successfully', () => {
      cy.intercept('/api/system/reports/?query=&limit=100&incTotal=true&sort=handle+ASC')
        .as('reports')
      cy.intercept('/api/system/reports/?query=cypress-report&limit=100&incTotal=true&pageCursor=&sort=handle+ASC')
        .as('report-search')
      cy.visit(reporterURL + '/list')
      cy.wait('@reports')
      cy.searchItem({ item: 'cypress-report' })
      cy.wait('@report-search')
      cy.wait(100)
      cy.get('[data-test-id="button-report-edit"]').click({ force: true })
      cy.get('[data-test-id="button-delete"]').click({ force: true })
      cy.get('[data-test-id="button-delete-confirm"]', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.searchItem({ item: 'cypress-report' })
      cy.wait('@report-search')
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
