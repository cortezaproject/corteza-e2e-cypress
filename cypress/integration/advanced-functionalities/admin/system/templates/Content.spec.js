/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing template content', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing template content', () => {
    it('should be able to submit a template', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Templates').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="input-search"]').type('test')
      // We wait 1s for the search to finish
      cy.wait(1000)
      cy.contains('test').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="template-html-editor"]').type('{{template "email_general_header" }}', { parseSpecialCharSequences: false })
      cy.get('[data-test-id="button-submit"]').click({ multiple: true })
    })
  })
})
