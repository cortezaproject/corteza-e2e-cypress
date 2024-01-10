/// <reference types="cypress" />
import { provisionAll, provisionDefaultReportCreate } from '../../../../provision/list'

const reporterURL = Cypress.env('REPORTER_URL')

describe('Testing the toggle functionality of the sidebar', () => {
  before(() => {
    // syntax issue
    cy.seedDb([...provisionAll, ...provisionDefaultReportCreate])
  })

  beforeEach(() => {
    cy.preTestLogin({ url: reporterURL })
    cy.visit(reporterURL + '/list')

    // We click on the report builder on the created report
    cy.get('table > tbody > :first-child()', { timeout: 10000 }).should('exist')
    cy.contains('Report Builder').click({ force: true })
    cy.get('[data-test-id="button-pin-icon"]', { timeout: 10000 }).click({ force: true })
  })

  context('Testing the toggle functionality of the sidebar', () => {
    it('should be able to unpin the sidebar', () => {
      // We click on the center of the page to move the focus away from the sidebar so it can hide
      cy.get('body').click('center')
      // We check that the pin icon is not present
      cy.get('[data-test-id="button-pin-icon"]').should('not.exist')
      // We check that the sidebar is not expanded
      cy.get('.b-sidebar > .expanded').should('not.exist')
    })

    it('should be able to pin the sidebar', () => {
      // We hover on the three lines in the top left corner so that the sidebar will expand
      cy.get('[data-test-id="button-sidebar-open"]', { timeout: 10000 }).trigger('mouseover', { force: true })
      cy.get('[data-test-id="button-pin-icon"]', { timeout: 10000 }).click({ force: true })
      // We click on the center of the page to move the focus away from the sidebar and to see if it will stay
      cy.get('body').click('center')
      // We check that the pin icon is present
      cy.get('[data-test-id="button-pin-icon"]').should('exist')
      // We check that the sidebar is expanded
      cy.get('.b-sidebar > .expanded').should('exist')
    })
  })
})