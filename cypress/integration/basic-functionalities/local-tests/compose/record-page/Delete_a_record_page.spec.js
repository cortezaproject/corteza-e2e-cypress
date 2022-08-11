/// <reference types="cypress" />
const composeURL = Cypress.env('webappLink').composeURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for deleting a record page', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: composeURL })
    }
  })

  context('Test for deleting a record page', () => {
    it('should be able to delete a record page', () => {
      cy.visit(composeURL + '/namespaces')
      // We wait three seconds in order the page content to be fully loaded
      cy.wait(3000)
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      // We wait four seconds in order the page content to be fully loaded
      cy.wait(4000)
      cy.get('[data-test-id="button-admin"]').click()
      // We wait three seconds in order the page content to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Pages').click()
      cy.get('[data-test-id="button-page-edit"]:first').click()
      cy.get('[data-test-id="dropdown-delete"]').click()
      cy.get('[data-test-id="dropdown-item-delete-sub-pages"]').click()
      // We wait three seconds in order the page content to be fully loaded
      cy.wait(3000)
      cy.contains('Cypress page').should('not.exist')
      cy.get('[data-test-id="button-page-edit"]').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.contains('New Page').should('not.exist')
    })
  })
})
