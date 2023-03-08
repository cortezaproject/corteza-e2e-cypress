/// <reference types="cypress" />
const reporterURL = Cypress.env('REPORTER_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing the sidebar default logo', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: reporterURL })
    }
  })

  context('Testing the sidebar default logo', () => {
    it('should be able to see the default logo', () => {
      cy.visit(reporterURL + '/list')
      // We wait for 1s in order the page to be fully loaded
      cy.wait(1000)
      // We click on the created report
      cy.get('table > tbody > :first-child()', { timeout: 10000 }).click()
      cy.get('[data-test-id="img-main-logo"]').should('have.attr', 'src').should('include', 'assets')
    })
  })
})
