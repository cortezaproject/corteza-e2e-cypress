/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a record page', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for creating a record page', () => {
    it('should be able to create a record page', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.get('[data-test-id="link-visit-namespace"]').click({ force: true })
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('[data-test-id="button-record-page-create"]').click()
      cy.get('.related-pages-dropdown').click()
      cy.get('[data-test-id="dropdown-link-record-list-page-create"]').click({ force: true })
      cy.get('.nav-sidebar').contains('Pages').click()
      cy.get('[data-test-id="button-page-view"]:first').click()
      // We check if the danger toast does not appear
      cy.get('.b-toast-danger').should('not.exist')
    })
  })

  context('Test for creating a page', () => {
    it('should be able to create a page', () => {
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('.nav-sidebar').contains('Pages').click()
      cy.get('[data-test-id="input-name"]').type('New Page')
      cy.get('[data-test-id="button-create-page"]').click()
      cy.get('[data-test-id="input-handle"]').type('new_cypress_page')
      cy.get('[data-test-id="input-description"]').type('Description')
      // Toggling page visibility
      cy.get('[data-test-id="checkbox-page-visibility"]').check({force: true}) 
      cy.get('[data-test-id="button-save-and-close"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success') 
    })
  })
})
