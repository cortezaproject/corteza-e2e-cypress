/// <reference types="cypress" />
import { provisionAll, provisionDefaultReportCreate } from '../../../provision/list'

const reporterURL = Cypress.env('REPORTER_URL')

describe('Test for editing a report', () => {
  before(() => {
    cy.seedDb([...provisionAll, ...provisionDefaultReportCreate])
  })

  beforeEach(() => {
    cy.preTestLogin({ url: reporterURL })
    
    cy.visit(reporterURL + '/list')
  })

  context('Test for editing a report', () => {
    it('should be able to edit the report and check if the changes are persisted', () => {
      cy.intercept('/api/system/reports/?query=&limit=100&incTotal=true&sort=handle+ASC')
        .as('reports')
      cy.intercept('/api/system/reports/?query=cypress-report&limit=100&incTotal=true&pageCursor=&sort=handle+ASC')
        .as('report-search')
      cy.wait('@reports')
      cy.searchItem({ item: 'cypress-report' })
      cy.wait('@report-search')
      cy.get('[data-test-id="button-report-edit"]').click({ force: true })
      cy.get('[data-test-id="input-name"]').clear().type('Edited cypress report')
      cy.get('[data-test-id="input-handle"]').clear().type('cypress_handle_edited')
      cy.get('[data-test-id="input-description"]').clear().type('This is an edited automated description.')
      cy.get('[data-test-id="button-save"]').click({ force: true })
      
      // Check if changes are persisted
      cy.get('[data-test-id="input-name"]').should('have.value', 'Edited cypress report')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_handle_edited')
      cy.get('[data-test-id="input-description"]').should('have.value', 'This is an edited automated description.')
      
      // Check if the name was changed in the report builder
      cy.get('[data-test-id="button-report-builder"]').click({ force: true })
      cy.contains('Edited cypress report')
      cy.get('[data-test-id="button-back"]').click({ force: true })
    })
  })
})
