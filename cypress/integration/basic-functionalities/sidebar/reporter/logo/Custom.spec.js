/// <reference types="cypress" />
const reporterURL = Cypress.env('REPORTER_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing the sidebar custom logo', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: reporterURL })
    }
  })

  context('Testing the sidebar custom logo', () => {
    it('should be able to have a default logo', () => {
      cy.visit(reporterURL + '/list')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      // We click on the created report
      cy.get('table > tbody > :first-child()').click()
      cy.get('[data-test-id="img-main-logo"]').should('have.attr', 'src').should('include','attachment')
    })
  })
})
