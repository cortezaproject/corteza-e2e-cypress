/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for checking if secret key is generated', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for checking if secret key is generated', () => {
    it('should be able to generate a secret key', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Auth Clients').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:first > td > a').click()
      cy.get('[data-test-id="input-client-secret"]').should('be.disabled')
      cy.get('[data-test-id="button-show-client-secret"]').click()
      cy.get('[data-test-id="button-regenerate-client-secret"]').click()
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })
  })
})
