/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing a record page', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for editing a record page', () => {
    it('should be able to edit a record page', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.get('[data-test-id="link-visit-namespace"]').click({ force: true })
      cy.get('[data-test-id="button-admin"]').click({ force: true })
      cy.get('.nav-sidebar').contains('Pages').click()
      cy.get('[data-test-id="button-page-edit"]:first').click()
      cy.get('[data-test-id="input-title"]').clear().type('Cypress page')
      cy.get('[data-test-id="input-handle"]').type('cypress_page')
      cy.get('[data-test-id="input-description"]').type('Page description')
      // Toggling page visibility
      cy.get('[data-test-id="checkbox-page-visibility"]').check({ force: true })
      cy.get('[data-test-id="button-save-and-close"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
    })

    it('should be edited', () => {
      cy.contains('Edit page').click()
      cy.get('[data-test-id="input-title"]').should('have.value', 'Cypress page')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_page')
      cy.get('[data-test-id="input-description"]').should('have.value', 'Page description')
    })
  })
})
