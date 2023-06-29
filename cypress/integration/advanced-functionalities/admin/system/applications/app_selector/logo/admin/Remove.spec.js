/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for removing a logo on application', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for removing a logo on application', () => {
    it('should be able to remove the logo', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('Testing application')
      // We wait 1s in order the search to be completed
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-application-selector"]').within(() => {
        cy.get('[data-test-id="button-logo-reset"]').click()
        cy.get('[data-test-id="button-submit"]').click()
        cy.get('[data-test-id="button-logo-show"]').should('not.exist')
        cy.get('[data-test-id="button-logo-reset"]').should('not.exist')
      })
    })
  })
})
