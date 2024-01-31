/// <reference types="cypress" />
import { provisionAll, provisionDefaultReportCreate } from '../../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')
const reporterURL = Cypress.env('REPORTER_URL')

describe('Testing the sidebar custom logo', () => {
  before(() => {
    cy.seedDb([...provisionAll, ...provisionDefaultReportCreate])
    cy.preTestLogin({ url: reporterURL })
  })
  
  context('Testing the sidebar custom logo', () => {
    it('should be able to set a custom logo', () => {
      cy.visit(adminURL + '/')
      cy.get('[data-test-id="sidebar"]', { timeout: 10000 })
        .find('a[href="/ui"]')
        .click({ force: true })
      cy.get('[data-test-id="drop-area"]:eq()')
        .get('input[type="file"]:eq()')
        .selectFile('cypress/fixtures/images/yin_yang.png', { force: true })
      cy.get('[data-test-id="button-submit"]:first', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.get('[data-test-id="img-main-logo"]', { timeout: 10000 })
        .should('have.attr', 'src')
        .should('include', 'attachment')
    })
  })

  context('Testing custom logo in reporter', () => {
    it('should check if custom logo is set', () => {
      cy.preTestLogin({ url: reporterURL })
      cy.visit(reporterURL + '/list')
      // We click on the report builder on the created report
      cy.get('[data-test-id="button-report-builder"]').click({ force: true })
      cy.get('[data-test-id="img-main-logo"]')
        .should('have.attr', 'src')
        .should('include','attachment')
    })
  })
})
