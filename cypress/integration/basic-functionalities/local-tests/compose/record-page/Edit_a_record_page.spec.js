/// <reference types="cypress" />
const composeURL = Cypress.env('webappLink').composeURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for editing a record page', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: composeURL })
    }
  })

  context('Test for editing a record page', () => {
    it('should be able to edit a record page', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      // We wait three seconds in order the page content to be fully loaded
      cy.wait(3000)
      cy.get('[data-test-id="button-admin"]').click({ force: true })
      // We wait three seconds in order the page content to be fully loaded
      cy.wait(3000)
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
      // We wait three seconds in order the page content to be fully loaded
      cy.wait(3000)
    })

    it('should be edited', () => {
      cy.contains('Edit page').click()
      cy.get('[data-test-id="input-title"]').should('have.value', 'Cypress page')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_page')
      cy.get('[data-test-id="input-description"]').should('have.value', 'Page description')
    })
  })
})
