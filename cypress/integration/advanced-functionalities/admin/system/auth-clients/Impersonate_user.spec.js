/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for adding an impersonate user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for adding an impersonate user', () => {
    it('should be able to add an impersonate user', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Auth Clients').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:first > td > a').click()
      cy.get('.custom-control:eq(1)').click()
      cy.get('[data-test-id="impersonate-user"]').click()
      cy.get('[data-test-id="select-user"]').type('Permissions account{enter}')
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
    })

    it('should be able to generate cURL snippet', () => {
      cy.contains('Generate cURL snippet').click()
      cy.get('[data-test-id="cURL"]').should('exist')
      cy.contains('Generate cURL snippet').should('not.exist')
      cy.contains('Hide cURL').click()
      cy.get('[data-test-id="cURL"]').should('not.exist')
      cy.contains('Hide cURL').should('not.exist')
    })
  })
})
