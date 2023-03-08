/// <reference types="cypress" />
const reporterURL = Cypress.env('REPORTER_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing the toggle functionality of the sidebar', () => {
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
      cy.get('[data-test-id="button-save"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
    })
  })

  context('Testing the toggle functionality of the sidebar', () => {
    it('should be able to unpin the sidebar', () => {
      cy.visit(reporterURL + '/list')
      // We wait for 1s in order the page to be fully loaded
      cy.wait(1000)
      // We click on the created report
      cy.get('table > tbody > :first-child()', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-pin-icon"]', { timeout: 10000 }).click()
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
      cy.get('[data-test-id="button-pin-icon"]', { timeout: 10000 }).click()
      // We click on the center of the page to move the focus away from the sidebar and to see if it will stay
      cy.get('body').click('center')
      // We check that the pin icon is present
      cy.get('[data-test-id="button-pin-icon"]').should('exist')
      // We check that the sidebar is expanded
      cy.get('.b-sidebar > .expanded').should('exist')
    })
  })
})
