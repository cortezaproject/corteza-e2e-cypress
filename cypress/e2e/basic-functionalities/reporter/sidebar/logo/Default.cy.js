/// <reference types="cypress" />
import { provisionAll } from '../../../../../provision/list'

const reporterURL = Cypress.env('REPORTER_URL')

describe('Testing the sidebar default logo', () => {
  before(() => {
    cy.seedDb(provisionAll)
    cy.preTestLogin({ url: reporterURL })
    cy.visit(reporterURL + '/list')
  })

  context('Testing the sidebar default logo', () => {
    it('should be able to see the default logo', () => {
      // We click on the report builder on the created report
      cy.get('table > tbody > :first-child()', { timeout: 10000 }).should('exist')
      cy.contains('Report Builder').click({ force: true })
      cy.get('[data-test-id="img-main-logo"]')
        .should('have.attr', 'src')
        .should('include', 'assets')
    })
  })
})
