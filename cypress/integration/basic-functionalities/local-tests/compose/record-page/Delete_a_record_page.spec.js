/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a record page', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for deleting a record page', () => {
    it('should be able to delete a record page', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.get('[data-test-id="link-visit-namespace"]').click({ force: true })
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="button-admin"]').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('.nav-sidebar').contains('Pages').click()
      cy.get('[data-test-id="button-page-edit"]:first').click()
      cy.get('[data-test-id="dropdown-delete"]').click()
      cy.get('[data-test-id="dropdown-item-delete-sub-pages"]').click()
      cy.contains('Cypress page').should('not.exist')
      cy.get('[data-test-id="button-page-edit"]').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.contains('New Page').should('not.exist')
    })
  })
})
